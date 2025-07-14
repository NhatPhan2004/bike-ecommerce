const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Không có token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Gán thông tin user vào request
    next();
  } catch (err) {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
};

module.exports = { requireAuth };
