import React, { useState } from "react";
import "@style/components/productCard.scss";
import apiRoutes from "@api";
import { Link } from "react-router-dom";

const ProductCard = ({ product, hidePrice = false }) => {
  const [errorCount, setErrorCount] = useState(0);

  const giaban = Math.round(Number(product.giaban));
  const discountPercent = product.discount || 30;

  const estimatedOriginal = product.originalPrice
    ? Number(product.originalPrice)
    : giaban / (1 - discountPercent / 100);

  const giagoc = Math.round(estimatedOriginal / 100000) * 100000;

  if (!product || !product.hinhanh) {
    return (
      <div className="product-card error">
        Sản phẩm không có thông tin hình ảnh
      </div>
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
      data-price={giaban}
    >
      <Link
        to={`/product/${product.bike_id}`}
        className="product-card__link"
        state={{
          flashPrice: product.flashPrice,
          discount: product.discount,
          originalPrice: product.originalPrice,
          isFlashSale: product.flashPrice !== undefined,
        }}
      >
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

        {!hidePrice && (
          <div className="product-card__price">
            <span className="product-card__price--current">
              {giaban.toLocaleString("vi-VN")}đ
            </span>
            <span className="product-card__price--old">
              {giagoc.toLocaleString("vi-VN")}đ
            </span>
            <span className="product-card__price--discount">
              -{discountPercent}%
            </span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
