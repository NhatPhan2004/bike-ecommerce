const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "quanlyxedap",
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed::", err.message);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

module.exports = db;
