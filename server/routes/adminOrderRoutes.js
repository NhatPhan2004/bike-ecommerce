const express = require("express");
const router = express.Router();
const pool = require("../config/database");

router.get("/pending", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        Donhang.Madonhang AS id,
        User.Hoten AS name,
        Donhang.Tongtien AS total,
        Donhang.Thoigiandat AS time,
        Donhang.Trangthai AS status
      FROM Donhang
      JOIN User ON Donhang.User_id = User.User_id
      WHERE Donhang.Trangthai != 'Delivered' AND Donhang.Trangthai != 'Cancelled'
      ORDER BY Donhang.Madonhang DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Lỗi lấy đơn hàng:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.put("/update-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await pool.execute("UPDATE Donhang SET Trangthai = ? WHERE Madonhang = ?", [
      status,
      id,
    ]);
    res.json({ message: "Update the success status" });
  } catch (err) {
    console.error("Update errors:", err);
    res.status(500).send("Error server");
  }
});

router.get("/completed-orders", async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
        Donhang.Madonhang AS id,
        User.Hoten AS name,
        Donhang.Tongtien AS total,
        Donhang.Thoigiandat AS time,
        Donhang.Trangthai AS status
      FROM Donhang
      JOIN User ON Donhang.User_id = User.User_id
      WHERE Donhang.Trangthai = 'Delivered' OR Donhang.Trangthai = 'Cancelled'
      ORDER BY Donhang.Madonhang DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error("Completed order pickup error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
