const moment = require("moment");
const qs = require("qs");
const crypto = require("crypto");
require("dotenv").config();

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

exports.createPaymentUrl = (req, res) => {
  const { amount, orderId, userId } = req.body;
  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: process.env.VNP_TMNCODE,
    vnp_Locale: "vn",
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

  const sortedParams = sortObject(vnp_Params);
  const signData = qs.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac("sha512", process.env.VNP_HASH_SECRET);
  const secureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  sortedParams.vnp_SecureHash = secureHash;

  const paymentUrl = `${process.env.VNP_URL}?${qs.stringify(sortedParams, {
    encode: true,
  })}`;

  console.log("✅ Full paymentUrl:", paymentUrl);
  console.log("🔐 Params before hash:", sortedParams);
  console.log("🔑 Data to hash:", signData);
  console.log("🔒 Generated hash:", secureHash);

  return res.json({ paymentUrl });
};

exports.vnpayReturn = (req, res) => {
  const vnp_Params = req.query;

  const secureHash = vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  const sortedParams = sortObject(vnp_Params);

  const signData = qs.stringify(sortedParams, { encode: false });
  const checkHash = crypto
    .createHmac("sha512", process.env.VNP_HASH_SECRET)
    .update(signData)
    .digest("hex");

  console.log("🔁 VNPay Return - Recomputed Hash:", checkHash);
  console.log("🔁 VNPay Return - Received Hash:", secureHash);

  if (secureHash === checkHash) {
    res.redirect(
      "/payment-success?vnp_ResponseCode=" + vnp_Params["vnp_ResponseCode"]
    );
  } else {
    res.status(400).json({ message: "Invalid signature from VNPay" });
  }
};

function findMismatch(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] !== b[i]) return i;
  }
  return -1;
}
