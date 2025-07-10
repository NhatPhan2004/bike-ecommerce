import React, { useState, useEffect } from "react";
import { getBaseUrl } from "../../../../utils/apiBaseUrl";
import "../../../../style/components/productCard.scss";

const ProductCard = ({ product }) => {
  const [baseUrl, setBaseUrl] = useState("");
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    getBaseUrl().then(setBaseUrl);
  }, []);

  if (!product || !product.hinhanh) {
    return (
      <div className="product-card error">Sản phẩm không có thông tin ảnh</div>
    );
  }

  const getImageUrl = () => {
    const baseName = product.hinhanh.split(".")[0];
    return `${baseUrl}/uploads/images/${baseName}.jpg`;
  };

  const handleImageError = (e) => {
    const baseName = product.hinhanh.split(".")[0];

    if (errorCount === 0) {
      e.target.src = `${baseUrl}/uploads/images/${baseName}.png`; // lần 1 fallback sang .png
      setErrorCount(1);
    } else if (errorCount === 1) {
      e.target.src = `${baseUrl}/uploads/images/placeholder.png`; // lần 2 fallback placeholder
      setErrorCount(2);
    } else {
      e.target.onerror = null; // chặn lặp vô hạn
    }
  };

  return (
    <div
      className="product-card"
      data-brand={product.thuonghieu}
      data-color={`Màu: ${product.mausac}`}
      data-price={product.giaban}
      data-delivery="Miễn phí giao hàng, Giao hàng nhanh 4h"
    >
      <a href={`/products/${product.bike_id}`} className="product-card__link">
        <div className="product-card__image">
          <img
            src={getImageUrl()}
            onError={handleImageError}
            alt={product.tenxe || "Ảnh sản phẩm"}
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
