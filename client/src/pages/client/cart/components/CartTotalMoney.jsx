import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "@style/components/cartSummary.scss";

const CartSummary = ({ total, cartItems }) => {
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleCheckout = () => {
    navigate("/address");
  };

  return (
    <div className="summary">
      <div className="summary__title">TOTAL MONEY CART MONEY</div>

      <div className="summary__row">
        <span>TOTAL PRODUCT</span>
        <span>{totalQuantity}</span>
      </div>

      <div className="summary__row">
        <span>TOTAL MONEY</span>
        <span>{total.toLocaleString()}₫</span>
      </div>

      <div className="summary__row summary__row--highlight">
        <span>TEMPORARY</span>
        <span>{total.toLocaleString()}₫</span>
      </div>

      <div className="summary__note">
        Free ship for orders from 3,000,000 VND
      </div>

      <div className="summary__buttons">
        <button onClick={handleContinueShopping}>CONTINUE SHOPPING</button>
        <button onClick={handleCheckout}>PAY</button>
      </div>

      <div className="summary__account">BLUESOLIS BIKE ACCOUNT</div>
    </div>
  );
};

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default CartSummary;
