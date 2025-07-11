import React, { useState } from "react";
import "../../../../style/components/productCard.scss";
import apiRoutes from "../../../../api";

const ProductCard = ({ product }) => {
  const [errorCount, setErrorCount] = useState(0);

  if (!product || !product.hinhanh) {
    return (
      <div className="product-card error">Sản phẩm không có thông tin ảnh</div>
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
      data-color={`Màu: ${product.mausac}`}
      data-price={product.giaban}
    >
      <a href={`/products/${product.bike_id}`} className="product-card__link">
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
      </a>
    </div>
  );
};

export default ProductCard;
