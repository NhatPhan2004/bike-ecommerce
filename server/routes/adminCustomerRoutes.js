const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT User_id, Hoten, Email, Diachi, Sdt 
       FROM user 
       WHERE role = 0`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error server" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.execute("DELETE FROM User WHERE User_id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No customer found" });
    }
    res.json({ message: "Successful customer removal" });
  } catch (err) {
    res.status(500).json({ message: "Error server" });
  }
});
module.exports = router;
