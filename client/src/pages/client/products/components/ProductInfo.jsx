import React, { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { IoGiftSharp } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { useAuth } from "@/contexts/AuthContext";

const ProductInfo = ({ product, onShowLogin }) => {
  const price = Math.round(parseInt(product.giaban));
  const oldPrice = Math.round(price / 0.7);
  const discount = oldPrice - price;

  const { user } = useAuth();
  const isLoggedIn = !!user;

  const [quantity, setQuantity] = useState(1);
  const handleQtyChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="product__right">
      <h1 className="product__title">{product.tenxe}</h1>

      <div className="product__meta">
        <span>Brand: {product.thuonghieu}</span> |{" "}
        <span>Product code: {product.bike_id}</span>
      </div>

      <div className="product__price">
        <span className="product__price--current">
          {price.toLocaleString("vi-VN")}đ
        </span>
        <span className="product__price--old">
          {oldPrice.toLocaleString("vi-VN")}đ
        </span>
        <span className="product__price--discount">-30%</span>
        <span className="product__price--savings">
          (Savings: {discount.toLocaleString("vi-VN")}đ)
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
              <button className="product__add-to-cart">ADD TO CART</button>
            </div>
            <button className="product__buy-now">BUY NOW</button>
          </>
        )}

        <div className="product__hotline">
          Hotline{" "}
          <a href="tel:18000000">
            <strong>1800.0000</strong>
          </a>{" "}
          (7:30 - 22:00)
        </div>

        <div className="product__benefits">
          <span>
            <FaShippingFast /> Nationwide Delivery
          </span>
          <span>
            <IoGiftSharp /> Earn Points
          </span>
          <span>
            <IoIosChatbubbles /> Dedicated Consultation
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
