// server/controllers/authController.js
const pool = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Đăng nhập
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
    const isMatch = await bcrypt.compare(password, user.Matkhau);

    if (!isMatch)
      return res.status(400).json({ message: "The password is incorrect" });

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

// Đăng ký
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone || !address) {
      console.log("❌ Lack of data fields:", {
        name,
        email,
        password,
        phone,
        address,
      });
      return res
        .status(400)
        .json({ message: "Lack of registration information" });
    }

    const [existingUser] = await pool.query(
      "SELECT 1 FROM user WHERE Email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email has existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Password được hash:", hashedPassword);

    const result = await pool.query(
      "INSERT INTO user (Hoten, Email, Matkhau, Sdt, Diachi, role) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, address, 0]
    );

    res.status(201).json({ message: "Successful registration" });
  } catch (error) {
    console.error("❌ Registration error:", error.message);
    console.error(error.stack);
    res
      .status(500)
      .json({ message: "Register for failure", error: error.message });
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

const generateRandomPassword = (length = 10) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Lack of email" });

  const [rows] = await pool.query("SELECT * FROM user WHERE Email = ?", [
    email,
  ]);
  if (!rows.length)
    return res.status(404).json({ message: "Email does not exist" });

  const user = rows[0];
  const newPassword = generateRandomPassword();
  const hashed = await bcrypt.hash(newPassword, 10);

  await pool.query("UPDATE user SET Matkhau = ? WHERE User_id = ?", [
    hashed,
    user.User_id,
  ]);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Bike Shop" <phannhunhat1234@gmail.com>',
    to: email,
    subject: "New password",
    html: `<p>Hello ${user.Hoten},</p><p>Your new password is: <strong>${newPassword}</strong></p>`,
  });

  res.json({ message: "Has sent a new password to email" });
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Successfully logged" });
};
