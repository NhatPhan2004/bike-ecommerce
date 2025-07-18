const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill in information" });
  }

  const checkSql = "SELECT * FROM user WHERE Email = ?";
  db.query(checkSql, [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Error server" });
    if (result.length > 0) {
      return res.status(400).json({ message: "Email has existed" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO user (Hoten, Email, Matkhau) VALUES (?, ?, ?)`;
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ message: "Register for failure" });
      return res.status(200).json({ message: "Successful registration" });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE Email = ?";
  db.query(sql, [email], async (err, result) => {
    if (err || result.length === 0)
      return res.status(400).json({ message: "Email does not exist" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.Matkhau);
    if (!isMatch)
      return res.status(400).json({ message: "The password is incorrect" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({
      token,
      user: { id: user.id, name: user.Hoten, email: user.Email },
    });
  });
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Successfully logged" });
};

exports.getProfile = (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT id, Hoten AS name, Email AS email FROM user WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }
    res.json(result[0]);
  });
};
