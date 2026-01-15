const db = require("../config/database");

const Review = {
  getFeatured: async () => {
    const sql = `
      SELECT id, customer_name, customer_title, avatar_url AS image, content, rating 
      FROM reviews 
      WHERE is_featured = 1 AND status = 'ACTIVE' 
      ORDER BY display_order ASC 
      LIMIT 3
    `;

    const [rows] = await db.query(sql);
    return rows;
  },
};

module.exports = Review;
