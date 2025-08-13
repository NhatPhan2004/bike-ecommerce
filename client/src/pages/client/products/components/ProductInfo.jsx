import React, { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { useAuth } from "@/contexts/AuthContext";
import AddToCartButton from "@components/common/Button/AddToCart";

const ProductInfo = ({
  product,
  flashPrice,
  discount = 0,
  originalPrice,
  onShowLogin,
}) => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  // const hasDiscount = product.flashPrice !== undefined;
  const [quantity, setQuantity] = useState(1);

  const handleQtyChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const giaban = flashPrice
    ? Math.round(flashPrice)
    : Math.round(Number(product.giaban));

  const giagoc = originalPrice
    ? Math.round(originalPrice)
    : product.originalPrice
    ? Math.round(product.originalPrice)
    : Math.round(giaban / 0.7 / 100000) * 100000;

  const discountPercent =
    discount || Math.round(((giagoc - giaban) / giagoc) * 100);

  const savings = giagoc - giaban;

  return (
    <div className="product__right">
      <h1 className="product__title">{product.tenxe}</h1>
      <div className="product__rating">★★★★☆</div>

      <div className="product__meta">
        <span>
          Brand:{" "}
          <span className="product__meta-brand">{product.thuonghieu}</span>
        </span>{" "}
        |{" "}
        <span>
          Product code:{" "}
          <span className="product__meta-code">{product.bike_id}</span>
        </span>
      </div>

      <div className="product__price">
        <span className="product__price--current">
          {giaban.toLocaleString("vi-VN")}đ
        </span>
        <span className="product__price--old">
          {giagoc.toLocaleString("vi-VN")}đ
        </span>
        <span className="product__price--discount">-{discountPercent}%</span>
        <span className="product__price--savings">
          (Savings: {savings.toLocaleString("vi-VN")}đ)
        </span>
      </div>

      <div className="product__promotion-box">
        <strong>🎁 PROMOTION - DEALS</strong>
        <ul>
          <li>Free Shipping for Orders from 300,000₫</li>
          <li>30-Day Return Policy</li>
          <li>Loyalty Points Program</li>
        </ul>
      </div>

      <div className="product__buy-section">
        {!isLoggedIn ? (
          <button className="product__buy-login-btn" onClick={onShowLogin}>
            SIGN IN TO PURCHASE
          </button>
        ) : (
          <>
            <div className="product__buy-box">
              <div className="product__quantity">
                <button onClick={() => handleQtyChange(-1)}>-</button>
                <input type="text" value={quantity} readOnly />
                <button onClick={() => handleQtyChange(1)}>+</button>
              </div>

              <AddToCartButton
                product={product}
                quantity={quantity}
                onShowLogin={onShowLogin}
                type="add"
                className="product__add-to-cart"
              />
            </div>

            <AddToCartButton
              product={product}
              quantity={quantity}
              onShowLogin={onShowLogin}
              type="buy"
              className="product__buy-now"
            />
          </>
        )}
      </div>

      <div className="product-benefits">
        <div className="product-benefits__item">
          <FaShippingFast className="product-benefits__icon" />
          <p>Nationwide delivery</p>
        </div>
        <div className="product-benefits__item">
          <IoIosChatbubbles className="product-benefits__icon" />
          <p>Dedicated advice - Answering all questions</p>
        </div>
        <div className="product-benefits__item">
          <IoGiftSharp className="product-benefits__icon" />
          <p>Accumulate all products</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
