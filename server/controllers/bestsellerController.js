const db = require("../config/database");

exports.getBestsellers = async (req, res) => {
  try {
    const sql = `
      SELECT 
        Bike_id AS bike_id, 
        Tenxe AS tenxe, 
        Giaban AS giaban, 
        Hinhanh AS hinhanh,
        Mausac AS mausac,
        sold_count AS sold_count
      FROM bestseller 
      WHERE is_featured = TRUE 
      ORDER BY display_order ASC 
      LIMIT 8
    `;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error getBestsellers:", err.message);
    res.status(500).json({ error: err.message });
  }
};
