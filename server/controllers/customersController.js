const pool = require("../config/database");

exports.getCustomers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT User_id, Hoten, Email, Sdt, Diachi
   FROM user
   WHERE role = 0`
    );

    res.json(rows);
  } catch (err) {
    console.error("getCustomers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
