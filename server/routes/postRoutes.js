const express = require("express");
const router = express.Router();
const {
  getHomePosts,
  getPostBySlug,
} = require("../controllers/postController");

router.get("/home", getHomePosts);
router.get("/:slug", getPostBySlug);

module.exports = router;
