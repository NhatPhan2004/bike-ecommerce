const pool = require("../config/database");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    const [rows] = await pool.query(
      `SELECT cart.bike_id, cart.quantity, cart.price, 
              xedap.tenxe, xedap.hinhanh AS img, xedap.mausac
       FROM cart
       JOIN xedap ON cart.bike_id = xedap.bike_id
       WHERE cart.user_id = ?`,
      [userId]
    );

    const total = rows.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    res.json({
      cart: {
        items: rows,
        total,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bikeId, quantity, price } = req.body;

    if (!bikeId || !quantity || !price)
      return res.status(400).json({ message: "Thiếu dữ liệu gửi lên" });

    const [rows] = await pool.query(
      `SELECT * FROM cart WHERE user_id = ? AND bike_id = ?`,
      [userId, bikeId]
    );

    if (rows.length > 0) {
      await pool.query(
        `UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND bike_id = ?`,
        [quantity, userId, bikeId]
      );
    } else {
      await pool.query(
        `INSERT INTO cart (user_id, bike_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [userId, bikeId, quantity, price]
      );
    }

    res.json({ message: "🛒 Add products to the basket successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error when adding products" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const bikeId = req.params.bikeId;
    const { quantity } = req.body;

    if (!quantity || quantity < 1)
      return res.status(400).json({ error: "The quantity is invalid" });

    await pool.query(
      `UPDATE cart SET quantity = ? WHERE user_id = ? AND bike_id = ?`,
      [quantity, userId, bikeId]
    );

    res.json({ message: "✅ Updated quantity" });
  } catch (err) {
    res.status(500).json({ error: "Server error when updating cart" });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const bikeId = req.params.bikeId;

    await pool.query(`DELETE FROM cart WHERE user_id = ? AND bike_id = ?`, [
      userId,
      bikeId,
    ]);

    res.json({ message: "🗑️ Has deleted the product from the basket" });
  } catch (err) {
    res.status(500).json({ error: "Server error when deleting products" });
  }
};
