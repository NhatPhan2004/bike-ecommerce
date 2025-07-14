// controllers/authController.js
const jwt = require("jsonwebtoken");
const db = require("../config/database");

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });

  const sql = `SELECT * FROM user WHERE Email = ? AND Matkhau = ? AND role = 0`;
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "Lỗi server" });
    if (result.length === 0)
      return res.status(401).json({ message: "Sai email hoặc mật khẩu" });

    const user = result[0];
    const token = jwt.sign(
      { id: user.User_id, email: user.Email },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    return res.json({ token, user: { id: user.User_id, email: user.Email } });
  });
};
