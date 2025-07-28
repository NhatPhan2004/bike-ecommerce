const db = require("../config/database");

exports.getAllProducts = async (req, res) => {
  try {
    const sql = `
      SELECT 
        Bike_id AS bike_id, 
        Mausac AS mausac, 
        Tenxe AS tenxe, 
        thuonghieu.Tenthuonghieu AS thuonghieu,
        Hinhanh AS hinhanh, 
        Giaban AS giaban 
      FROM xedap 
      JOIN thuonghieu ON xedap.Brand_id = thuonghieu.Brand_id
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Lỗi getAllProducts:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const sql = `
      SELECT 
        Bike_id AS bike_id, 
        Mausac AS mausac, 
        Tenxe AS tenxe, 
        thuonghieu.Tenthuonghieu AS thuonghieu,
        Hinhanh AS hinhanh, 
        Giaban AS giaban 
      FROM xedap 
      JOIN thuonghieu ON xedap.Brand_id = thuonghieu.Brand_id
      WHERE Bike_id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("❌ Lỗi getProductById:", err.message);
    res.status(500).json({ error: err.message });
  }
};
