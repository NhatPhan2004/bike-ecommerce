const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateRandomPassword = (length = 10) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Lack of email or password" });

  try {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE Email = ? AND role = 1",
      [email]
    );

    const admin = rows[0];
    if (!admin) {
      return res.status(401).json({ message: "Email does not existi." });
    }

    if (admin.Matkhau !== password) {
      return res.status(401).json({ message: "The password is incorrect." });
    }

    const token = jwt.sign(
      { id: admin.User_id, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Admin login successfully.",

      token,
      admin: {
        id: admin.User_id,
        name: admin.Hoten,
        email: admin.Email,
        role: admin.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Login error", error: err.message });
  }
};

exports.adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Lack of registration information" });
    }

    const [existingAdmin] = await pool.query(
      "SELECT 1 FROM user WHERE Email = ? AND role = 1",
      [email]
    );
    if (existingAdmin.length > 0)
      return res.status(400).json({ message: "Email has existed" });
    await pool.query(
      "INSERT INTO user (Hoten, Email, Matkhau, Diachi, Sdt, role) VALUES (?, ?, ?, '', '', ?)",
      [name, email, password, 1]
    );

    res.status(201).json({ message: "Successful registration" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Register for failure", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE Email = ? AND role = 1",
      [email]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Admin not found with this email" });
    }

    const newPassword = generateRandomPassword(10);
    await pool.query(
      "UPDATE user SET Matkhau = ? WHERE Email = ? AND role = 1",
      [newPassword, email]
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"Bike Shop" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your new password",
      text: `Your new password is: ${newPassword}`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "A new password has been sent to your email." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getAdminProfile = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT User_id, Hoten, Email, role FROM user WHERE User_id = ? AND role = 1",
      [req.user.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Admin not found" });

    res.json({ admin: rows[0] });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to get admin profile", error: err.message });
  }
};

exports.adminChangePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return res.status(400).json({ message: "Missing information" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE Email = ? AND role = 1",
      [email]
    );

    const admin = rows[0];
    if (!admin || admin.Matkhau !== currentPassword) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    await pool.query(
      "UPDATE user SET Matkhau = ? WHERE Email = ? AND role = 1",
      [newPassword, email]
    );

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to change password", error: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [[orderCount]] = await pool.query(
      `SELECT COUNT(*) AS totalOrders FROM donhang`
    );
    const [[totalRevenue]] = await pool.query(
      `SELECT SUM(Tongtien) AS totalRevenue FROM donhang WHERE Trangthai = 'Delivered'`
    );
    const [[productCount]] = await pool.query(
      `SELECT COUNT(*) AS totalProducts FROM sanpham`
    );
    const [[customerCount]] = await pool.query(
      `SELECT COUNT(*) AS totalCustomers FROM user WHERE role = 0`
    );

    res.json({
      totalOrders: orderCount.totalOrders || 0,
      totalRevenue: totalRevenue.totalRevenue || 0,
      totalProducts: productCount.totalProducts || 0,
      totalCustomers: customerCount.totalCustomers || 0,
    });
  } catch (err) {
    console.error("getStats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
