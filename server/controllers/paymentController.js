const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");
const pool = require("../config/database");

function sortObject(obj) {
  let sorted = {};
  let keys = [];
  for (let k in obj)
    if (obj.hasOwnProperty(k)) keys.push(encodeURIComponent(k));
  keys.sort();
  for (let k = 0; k < keys.length; k++) {
    const key = keys[k];
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  }
  return sorted;
}

exports.createPaymentUrl = async (req, res) => {
  try {
    const { amount, orderId, userId, bankCode, language } = req.body;
    if (!amount || !orderId || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const ipAddr =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

    const locale = language || "vn";
    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: process.env.VNP_TMNCODE,
      vnp_Locale: locale,
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: process.env.VNP_RETURN_URL,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: moment().format("YYYYMMDDHHmmss"),
      vnp_ExpireDate: moment().add(15, "minutes").format("YYYYMMDDHHmmss"),
    };

    if (bankCode) vnp_Params["vnp_BankCode"] = bankCode;

    const sortedParams = sortObject(vnp_Params);

    const signData = qs.stringify(sortedParams, { encode: false });
    const secureHash = crypto
      .createHmac("sha512", process.env.VNP_HASH_SECRET)
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");

    sortedParams["vnp_SecureHash"] = secureHash;
    sortedParams["vnp_SecureHashType"] = "SHA512";

    const paymentUrl = `${process.env.VNP_URL}?${qs.stringify(sortedParams, {
      encode: false,
    })}`;

    await pool.query(
      "INSERT INTO donhang (Madonhang, User_id, Tongtien, Thoigiandat, Trangthai) VALUES (?, ?, ?, NOW(), 'pending')",
      [orderId, userId, amount]
    );

    return res.json({ paymentUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.vnpayReturn = async (req, res) => {
  try {
    let vnp_Params = { ...req.query };
    const secureHash = vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);
    const signData = qs.stringify(vnp_Params, { encode: false });
    const checkHash = crypto
      .createHmac("sha512", process.env.VNP_HASH_SECRET)
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");

    if (secureHash !== checkHash) {
      console.error("VNPay return - signature mismatch!");
      return res.redirect(
        `/payment-failed?reason=invalid_signature&orderId=${vnp_Params.vnp_TxnRef}`
      );
    }

    const status =
      vnp_Params.vnp_ResponseCode === "00" ? "completed" : "failed";

    await pool.query("UPDATE donhang SET Trangthai=? WHERE Madonhang=?", [
      status,
      vnp_Params.vnp_TxnRef,
    ]);

    if (status === "completed") {
      return res.redirect(
        `http://localhost:3000/payment-success?vnp_TransactionNo=${
          vnp_Params.vnp_TransactionNo
        }&amount=${vnp_Params.vnp_Amount / 100}`
      );
    } else {
      return res.redirect(
        `http://localhost:3000/payment-failed?code=${vnp_Params.vnp_ResponseCode}&orderId=${vnp_Params.vnp_TxnRef}`
      );
    }
  } catch (err) {
    console.error(err);
    return res.redirect("/payment-failed?reason=server_error");
  }
};
