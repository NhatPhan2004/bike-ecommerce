const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "quanlyxedap",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Kết nối DB thất bại:", err.message);
  } else {
    console.log("✅ Kết nối MySQL thành công!");
  }
});

module.exports = db;
