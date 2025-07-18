const pool = require("../config/database");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query(
      `SELECT cart.bike_id, cart.quantity, cart.price, 
              bike.tenxe, bike.hinhanh, bike.mausac
       FROM cart
       JOIN bike ON cart.bike_id = bike.bike_id
       WHERE cart.user_id = ?`,
      [userId]
    );

    const total = rows.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    res.json({ items: rows, total });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bikeId, quantity, price } = req.body;

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

    res.json({ message: "Item added to cart" });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const bikeId = req.params.bikeId;
    const { quantity } = req.body;

    if (quantity < 1)
      return res.status(400).json({ error: "Invalid quantity" });

    await pool.query(
      `UPDATE cart SET quantity = ? WHERE user_id = ? AND bike_id = ?`,
      [quantity, userId, bikeId]
    );

    res.json({ message: "Cart updated" });
  } catch (err) {
    console.error("Update cart error:", err);
    res.status(500).json({ error: "Server error" });
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

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Remove item error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
