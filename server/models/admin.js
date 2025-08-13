const pool = require("../config/database");

exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE Email = ?", [
    email,
  ]);
  return rows[0];
};
