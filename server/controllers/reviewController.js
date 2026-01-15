const Review = require("../models/reviewModel");

const getFeaturedReviews = async (req, res) => {
  try {
    const data = await Review.getFeatured();
    res.status(200).json(data);
  } catch (error) {
    console.error("Lỗi Controller:", error);
    res.status(500).json({
      message: "Lỗi Server khi lấy review",
      error: error.message,
    });
  }
};

module.exports = { getFeaturedReviews };
