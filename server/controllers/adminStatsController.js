const pool = require("../config/database");

const getAdminStats = async (req, res) => {
  try {
    const [orders] = await pool.execute(
      "SELECT COUNT(*) AS total_orders FROM donhang"
    );
    const [revenue] = await pool.execute(
      "SELECT SUM(Tongtien) AS total_revenue FROM donhang WHERE Trangthai = 'Delivered'"
    );
    const [users] = await pool.execute(
      "SELECT COUNT(*) AS total_users FROM user WHERE role = 0"
    );
    const [products] = await pool.execute(
      "SELECT COUNT(*) AS total_products FROM xedap"
    );

    res.json({
      orders: orders[0].total_orders || 0,
      revenue: revenue[0].total_revenue || 0,
      users: users[0].total_users || 0,
      products: products[0].total_products || 0,
    });
  } catch (err) {
    console.error("Error getAdminStats:", err);
    res
      .status(500)
      .json({ message: "Server error when retrieving statistics" });
  }
};

module.exports = { getAdminStats };
