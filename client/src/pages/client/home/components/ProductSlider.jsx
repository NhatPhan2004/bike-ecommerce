import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "@style/components/productSlider.scss";
import productService from "@services/productService";
import apiRoutes from "@api";
import { GiCartwheel } from "react-icons/gi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({}) => {
  const [products, setProducts] = useState([]);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    productService
      .getAll()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("ProductSlider error:", err));
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    arrows: true,
    beforeChange: (current, next) => setCenterIndex(next),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="product-slider">
      <div className="product-slider__container">
        <h2 className="product-slider__title">PRODUCT CATALOG</h2>
        <div className="product-slider__line">
          <span className="product-slider__icon">
            <GiCartwheel className="wheel-icon" />
          </span>
        </div>
        <Slider {...settings}>
          {products.map((item, index) => {
            const isActive = index === centerIndex % products.length;
            return (
              <div
                key={index}
                className={`product-slider__slide ${
                  isActive ? "product-slider__slide--active" : ""
                }`}
              >
                <Link
                  to={`/product/${item.bike_id}`}
                  className="product-slider__link"
                >
                  <div className="product-slider__card" key={item.bike_id}>
                    <img
                      className="product-slider__card-image"
                      src={`${apiRoutes.imageBase}${apiRoutes.image.product}${item.hinhanh}`}
                      alt={item.tenxe}
                    />
                    <h4 className="product-slider__card-name">{item.tenxe}</h4>
                    <div className="product-slider__card-rating">★★★★☆</div>

                    <p className="product-slider__card-price">
                      {Number(item.giaban).toLocaleString()} đ
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
