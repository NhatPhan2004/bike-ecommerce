const db = require("../config/database");

const getPostBySlug = async (slug) => {
  const query = `
    SELECT * FROM posts
    WHERE slug = ?
    LIMIT 1
  `;
  const [rows] = await db.query(query, [slug]);
  return rows[0] || null;
};

module.exports = {
  getPostBySlug,
};
