const db = require("../config/database");

exports.getPostBySlug = (slug, callback) => {
  const sql = "SELECT * FROM posts WHERE slug = ?";
  db.query(sql, [slug], (err, result) => {
    if (err) return callback(err);
    if (result.length === 0) return callback(null, null);
    callback(null, result[0]);
  });
};
