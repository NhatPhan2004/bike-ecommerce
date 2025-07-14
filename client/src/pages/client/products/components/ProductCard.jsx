import React, { useState } from "react";
import "@style/components/productCard.scss"
import apiRoutes from "@api";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [errorCount, setErrorCount] = useState(0);

  if (!product || !product.hinhanh) {
    return (
      <div className="product-card error">Product has no image information</div>
    );
  }

  const getImageUrl = (ext = "jpg") => {
    const baseName = product.hinhanh.split(".")[0];
    return `${apiRoutes.imageBase}/${baseName}.${ext}`;
  };

  const handleImageError = (e) => {
    if (errorCount === 0) {
      e.target.src = getImageUrl("png");
      setErrorCount(1);
    } else if (errorCount === 1) {
      e.target.src = `${apiRoutes.imageBase}/placeholder.png`;
      setErrorCount(2);
    } else {
      e.target.onerror = null;
    }
  };

  return (
    <div
      className="product-card"
      data-brand={product.thuonghieu}
      data-color={`Color: ${product.mausac}`}
      data-price={product.giaban}
    >
      <Link to={`/product/${product.bike_id}`} className="product-card__link">
        <div className="product-card__image">
          <img
            src={`${apiRoutes.imageBase}${apiRoutes.image.product}${product.hinhanh}`}
            onError={handleImageError}
            alt={product.tenxe || "Image Products"}
          />
        </div>
        <div className="product-card__brand">{product.thuonghieu}</div>
        <div className="product-card__title">{product.tenxe}</div>
        <div className="product-card__rating">★★★★☆</div>
        <div className="product-card__price">
          <span className="product-card__price--current">
            {Number(product.giaban).toLocaleString()}đ
          </span>
          <span className="product-card__price--old">
            {(Number(product.giaban) * 1.3).toLocaleString()}đ
          </span>
          <span className="product-card__price--discount">-30%</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
