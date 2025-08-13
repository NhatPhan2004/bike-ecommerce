const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    if (decoded.role !== 1) {
      return res.status(403).json({ message: "Access denied: Admin only" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = adminAuthMiddleware;
