// server/controllers/authController.js
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

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Lack of email or password" });

  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE Email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(400).json({ message: "Email does not exist" });

    const user = rows[0];

    if (user.Matkhau !== password) {
      return res.status(400).json({ message: "The password is incorrect" });
    }

    const token = jwt.sign({ id: user.User_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: user.User_id,
        name: user.Hoten,
        email: user.Email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res
        .status(400)
        .json({ message: "Lack of registration information" });
    }

    const [existingUser] = await pool.query(
      "SELECT 1 FROM user WHERE Email = ?",
      [email]
    );
    if (existingUser.length > 0)
      return res.status(400).json({ message: "Email has existed" });
    await pool.query(
      "INSERT INTO user (Hoten, Email, Matkhau, Sdt, Diachi, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, password, phone, address, 0]
    );

    res.status(201).json({ message: "Successful registration" });
  } catch (error) {
    res
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
    const [rows] = await pool.query("SELECT * FROM user WHERE Email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    const newPassword = generateRandomPassword(10);
    await pool.query("UPDATE user SET Matkhau = ? WHERE Email = ?", [
      newPassword,
      email,
    ]);

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
    console.error(err.stack);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [rows] = await pool.query("SELECT * FROM user WHERE User_id = ?", [
      userId,
    ]);
    const user = rows[0];

    if (!user || user.Matkhau !== currentPassword) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    await pool.query("UPDATE user SET Matkhau = ? WHERE User_id = ?", [
      newPassword,
      userId,
    ]);

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("❌ Change Password Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMyOrders = async (req, res) => {
  const userId = req.user.id;
  const [orders] = await pool.query(
    `SELECT * FROM donhang WHERE User_id = ? ORDER BY created_at DESC`,
    [userId]
  );
  res.json(orders);
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Successfully logged out" });
};
