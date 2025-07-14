const db = require("../config/database");

exports.getAllProducts = (req, res) => {
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
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getProductById = (req, res) => {
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
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    res.status(200).json(result[0]);
  });
};
