// controllers/postController.js
const db = require("../config/database");
const Post = require("../models/postNews");

const getHomePosts = (req, res) => {
  const query = `
    SELECT 
      id, title, excerpt, 
      CONCAT('/uploads/images/', image) AS image, 
      created_at, read_time, slug
    FROM posts 
    ORDER BY created_at DESC 
    LIMIT 4
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Lỗi DB:", err);
      return res.status(500).json({ success: false, message: "Error server" });
    }

    res.json(results);
  });
};

const getPostBySlug = (req, res) => {
  const { slug } = req.params;
  Post.getPostBySlug(slug, (err, post) => {
    if (err) return res.status(500).json({ error: "Error server" });
    if (!post) return res.status(404).json({ error: "No article found" });
    res.json(post);
  });
};

module.exports = {
  getHomePosts,
  getPostBySlug,
};
