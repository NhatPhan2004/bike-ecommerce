const pool = require("../config/database");

// Get all pending/in-progress orders
exports.getOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT donhang.Madonhang AS id,
              user.Hoten AS customerName,
              donhang.Tongtien AS total,
              donhang.Thoigiandat AS time,
              donhang.Trangthai AS status
       FROM donhang
       JOIN user ON donhang.User_id = user.User_id
       WHERE donhang.Trangthai NOT IN ('Delivered', 'Cancelled')
       ORDER BY donhang.Thoigiandat DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("getOrders error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: "Missing id or status" });
    }
    const [result] = await pool.query(
      "UPDATE donhang SET Trangthai = ? WHERE Madonhang = ?",
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "The order does not exist" });
    }
    res.json({ message: "Update the success status" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Status update error", error: error.message });
  }
};

// Get completed orders (Delivered or Cancelled)
exports.getCompletedOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        donhang.Madonhang AS id,
        user.Hoten AS name,
        donhang.Tongtien AS total,
        donhang.Thoigiandat AS time,
        donhang.Trangthai AS status
      FROM donhang
      JOIN user ON donhang.User_id = user.User_id
      WHERE donhang.Trangthai = 'Delivered' OR donhang.Trangthai = ', 'Cancelled'
      ORDER BY donhang.Madonhang DESC
    `);
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Order picking error", error: error.message });
  }
};

exports.getProcessingOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        donhang.Madonhang AS id,
        user.Hoten AS name,
        donhang.Tongtien AS total,
        donhang.Thoigiandat AS time,
        donhang.Trangthai AS status
      FROM donhang
      JOIN user ON donhang.User_id = user.User_id
      WHERE donhang.Trangthai NOT IN ('Delivered', 'Cancelled'')
      ORDER BY donhang.Madonhang DESC
    `);
    res.json(rows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Order picking error", error: error.message });
  }
};
