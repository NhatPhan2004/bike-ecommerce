import React from "react";
import "@style/components/review.scss";
import { useEffect, useState } from "react";
import apiRoutes from "@api";
import axios from "axios";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${apiRoutes.base}${apiRoutes.review.getFeatured}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  if (reviews.length === 0) return null;
  const currentReview = reviews[currentIndex];
  const imageUrl = `${apiRoutes.imageBase}${apiRoutes.image.review}${currentReview.image}`;

  return (
    <section className="review">
      <div className="review__container">
        <button
          className="review__nav-btn review__nav-btn--prev"
          onClick={prevReview}
        >
          ‹
        </button>
        <button
          className="review__nav-btn review__nav-btn--next"
          onClick={nextReview}
        >
          ›
        </button>

        <div className="review__panel review__panel--left">
          <div className="review__bg">
            <img
              src={imageUrl}
              alt={currentReview.customer_name}
              className="review__img"
            />
          </div>

          <div className="review__customer">
            <h3 className="review__customer-name">
              {currentReview.customer_name}
            </h3>
            <p className="review__customer-title">
              {currentReview.customer_title}
            </p>
          </div>
        </div>

        <div className="review__panel review__panel--right">
          <div className="review__header">
            <span className="review__badge">Đánh giá khách hàng</span>
            <h2 className="review__main-title">
              <span className="review__quote-icon">“</span> Khách hàng nói gì về
              chúng tôi! <span className="review__quote-icon">”</span>
            </h2>
          </div>

          <div className="review__content">
            <p className="review__text">{currentReview.content}</p>
          </div>

          <div className="review__rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`review__star ${
                  i < currentReview.rating ? "review__star--active" : ""
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Review;
