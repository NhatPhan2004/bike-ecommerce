const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.get("/featured", reviewController.getFeaturedReviews);

module.exports = router;
