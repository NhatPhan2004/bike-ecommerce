const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");
const pool = require("../config/database");
const path = require("path");
const fs = require("fs");
const db = require("../config/database");
const PDFDocument = require("pdfkit");

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
    const { amount, userId, bankCode, language } = req.body;

    if (!amount || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const insert = await pool.query(
      "INSERT INTO donhang (User_id, Tongtien, Thoigiandat, Trangthai) VALUES (?, ?, NOW(), 'pending')",
      [userId, amount]
    );

    const orderId = insert[0].insertId;

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
      return res.redirect(
        `http://localhost:3000/payment-failed?reason=invalid_signature`
      );
    }

    const orderId = vnp_Params.vnp_TxnRef;

    // kiểm tra đơn hàng có tồn tại
    const [[order]] = await pool.query(
      "SELECT User_id FROM donhang WHERE Madonhang=?",
      [orderId]
    );

    if (!order) {
      return res.redirect(
        `http://localhost:3000/payment-failed?reason=order_not_found`
      );
    }

    const userId = order.User_id;
    const status = vnp_Params.vnp_ResponseCode === "00" ? "Paid" : "Failed";

    await pool.query("UPDATE donhang SET Trangthai=? WHERE Madonhang=?", [
      status,
      orderId,
    ]);

    if (status === "Paid") {
      const [cartItems] = await pool.query(
        "SELECT bike_id, quantity, price FROM cart WHERE user_id=?",
        [userId]
      );

      for (let item of cartItems) {
        await pool.query(
          `INSERT INTO chitiethoadon (Madonhang, User_id, Bike_id, quantity, price)
           VALUES (?, ?, ?, ?, ?)`,
          [orderId, userId, item.bike_id, item.quantity, item.price]
        );
      }

      await pool.query("DELETE FROM cart WHERE user_id=?", [userId]);

      return res.redirect(`http://localhost:3000/invoice?orderId=${orderId}`);
    }

    return res.redirect(
      `http://localhost:3000/payment-failed?code=${vnp_Params.vnp_ResponseCode}`
    );
  } catch (err) {
    console.error("VNPAY RETURN ERROR:", err);
    return res.redirect(
      `http://localhost:3000/payment-failed?reason=server_error`
    );
  }
};

exports.getInvoice = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const [[order]] = await pool.query(
      `SELECT * FROM donhang WHERE Madonhang = ?`,
      [orderId]
    );

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    const [[user]] = await pool.query(`SELECT * FROM user WHERE User_id = ?`, [
      order.User_id,
    ]);

    const [items] = await pool.query(
      `
      SELECT c.*, x.Tenxe 
      FROM chitiethoadon c
      JOIN xedap x ON c.Bike_id = x.Bike_id
      WHERE c.Madonhang = ?
      `,
      [orderId]
    );

    const [rows] = await pool.query(
      `SELECT Thoigiandat FROM donhang WHERE Madonhang = ?`,
      [orderId]
    );

    const timeUpdate = rows[0]?.Thoigiandat || null;

    const [row] = await pool.query(
      `
    SELECT DATE_FORMAT(Thoigiandat, '%d/%m/%Y') AS NgayDat 
    FROM donhang 
    WHERE Madonhang = ?
  `,
      [orderId]
    );

    const timeOrder = row[0]?.NgayDat || null;

    return res.json({
      orderId,
      user,
      items,
      timeUpdate,
      timeOrder,
      total: order.Tongtien,
    });
  } catch (err) {
    console.error("INVOICE ERROR:", err);
    res.status(500).json({ message: "Lỗi server tạo hóa đơn" });
  }
};

exports.getInvoicePdf = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const [[order]] = await pool.query(
      `SELECT * FROM donhang WHERE Madonhang = ?`,
      [orderId]
    );

    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }

    const [[user]] = await pool.query(`SELECT * FROM user WHERE User_id = ?`, [
      order.User_id,
    ]);

    const [items] = await pool.query(
      `
      SELECT c.*, x.Tenxe 
      FROM chitiethoadon c
      JOIN xedap x ON c.Bike_id = x.Bike_id
      WHERE c.Madonhang = ?
      `,
      [orderId]
    );

    // Tạo PDF
    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=hoa-don-${orderId}.pdf`
    );

    // Quan trọng: pipe trước
    doc.pipe(res);

    doc
      .fontSize(18)
      .text(`HÓA ĐƠN THANH TOÁN #${orderId}`, { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Khách hàng: ${user.Hoten}`);
    doc.text(`Email: ${user.Email}`);
    doc.text(`Địa chỉ: ${user.Diachi || "Không có"}`);
    doc.moveDown();

    doc.text("Chi tiết sản phẩm:");
    items.forEach((item) => {
      doc.text(`${item.Tenxe} - SL: ${item.quantity} - Giá: ${item.price} VND`);
    });

    doc.moveDown();
    doc.text(`Tổng tiền: ${order.Tongtien} VND`);

    // Quan trọng: end sau cùng
    doc.end();
  } catch (err) {
    console.error("PDF ERROR:", err);
    res.status(500).json({ message: "Lỗi server tạo PDF" });
  }
};
