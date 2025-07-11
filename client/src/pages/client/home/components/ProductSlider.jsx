import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../../../style/components/productSlider.scss";
import productService from "../../../../services/productService";
import apiRoutes from "../../../../api";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = () => {
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

  // const displayedProducts = products.slice(0, 3);

  return (
    <div className="product-slider">
      <div className="product-slider__container">
        <h2 className="product-slider__title">PRODUCT CATALOG</h2>
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
                <div className="product-slider__card">
                  <img
                    className="product-slider__card-image"
                    src={`${apiRoutes.imageBase}${apiRoutes.image.product}${item.hinhanh}`}
                    alt={item.tenxe}
                  />

                  <div className="product-slider__card-rating">★★★★☆</div>
                  <h4 className="product-slider__card-name">{item.tenxe}</h4>
                  <p className="product-slider__card-price">
                    {Number(item.giaban).toLocaleString()} đ
                  </p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ProductSlider;
