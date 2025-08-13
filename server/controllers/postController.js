const db = require("../config/database");
const Post = require("../models/postNews");

const getHomePosts = async (req, res) => {
  const query = `
    SELECT 
      id, title, excerpt, 
      CONCAT('/uploads/images/', image) AS image, 
      created_at, read_time, slug
    FROM posts 
    ORDER BY created_at DESC 
    LIMIT 4
  `;

  try {
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("❌ Lỗi getHomePosts:", err);
    res.status(500).json({ error: "Lỗi server", detail: err.message });
  }
};

const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await Post.getPostBySlug(slug);
    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    res.json(post);
  } catch (err) {
    console.error("❌ Lỗi getPostBySlug:", err.message);
    res.status(500).json({ error: "Lỗi server" });
  }
};

module.exports = {
  getHomePosts,
  getPostBySlug,
};
