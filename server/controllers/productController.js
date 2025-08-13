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
    console.error("❌ Error getAllProducts:", err.message);
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
      return res.status(404).json({ message: "No Products Found" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("❌ Error getProductById:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getProductsForAdmin = async (req, res) => {
  try {
    const sql = `
  SELECT 
    xedap.Bike_id AS bike_id,
    xedap.Tenxe AS tenxe,
    thuonghieu.Tenthuonghieu AS thuonghieu,
    loaixe.Tenloaixe AS tenloaixe,
    xedap.Giaban AS giaban,
    xedap.Soluong AS soluong,
    xedap.Hinhanh AS hinhanh,
    xedap.Mausac AS mausac
  FROM xedap
  JOIN thuonghieu ON xedap.Brand_id = thuonghieu.Brand_id
  JOIN loaixe ON xedap.Loaixe_id = loaixe.Loaixe_id
  ORDER BY xedap.Bike_id ASC
`;

    const [rows] = await db.query(sql);
    res.status(200).json({ products: rows });
  } catch (err) {
    console.error("Error getProductsForAdmin:", err.message);
    res.status(500).json({ message: "Product retrieval error" });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { Bike_id, Tenxe, Brand_id, Loaixe_id, Giaban, Soluong } = req.body;
    const hinhanh = req.file ? req.file.filename : null;

    if (!Bike_id || !Tenxe || !Brand_id || !Loaixe_id || !Giaban || !Soluong) {
      return res.status(400).json({ message: "Lack of required data" });
    }

    const sql = `
      INSERT INTO xedap (Bike_id, Tenxe, Brand_id, Loaixe_id, Giaban, Soluong, Hinhanh)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(sql, [
      Bike_id,
      Tenxe,
      Brand_id,
      Loaixe_id,
      Giaban,
      Soluong,
      hinhanh,
    ]);
    res.status(201).json({ message: "Add a successful product" });
  } catch (err) {
    console.error("Lỗi addProduct:", err.message);
    res.status(500).json({ message: "Error adding products" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const { Tenxe, Brand_id, Loaixe_id, Giaban, Soluong } = req.body;
    let hinhanh = null;
    if (req.file) {
      hinhanh = req.file.filename;
    }

    const [oldRows] = await db.query(
      "SELECT Hinhanh FROM xedap WHERE Bike_id = ?",
      [id]
    );
    if (oldRows.length === 0)
      return res.status(404).json({ message: "No Products Found" });
    const oldImage = oldRows[0].Hinhanh;

    const finalImage = hinhanh || oldImage;

    const sql = `
      UPDATE xedap SET Tenxe = ?, Brand_id = ?, Loaixe_id = ?, Giaban = ?, Soluong = ?, Hinhanh = ?
      WHERE Bike_id = ?
    `;
    await db.query(sql, [
      Tenxe,
      Brand_id,
      Loaixe_id,
      Giaban,
      Soluong,
      finalImage,
      id,
    ]);
    res.status(200).json({ message: "Successful product updates" });
  } catch (err) {
    console.error("Error updateProduct:", err.message);
    res.status(500).json({ message: "Product update error" });
  }
};

// Xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query("DELETE FROM xedap WHERE Bike_id = ?", [id]);
    res.status(200).json({ message: "Successful product deletion" });
  } catch (err) {
    console.error("Error deleteProduct:", err.message);
    res.status(500).json({ message: "Product deletion errors" });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const sql = `SELECT Brand_id AS id, Tenthuonghieu AS name FROM thuonghieu`;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Lỗi getAllBrands:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLoaixes = async (req, res) => {
  try {
    const sql = `SELECT Loaixe_id AS id, Tenloaixe AS name FROM loaixe`;
    const [rows] = await db.query(sql);
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error getAllLoaixes:", err.message);
    res.status(500).json({ error: err.message });
  }
};
