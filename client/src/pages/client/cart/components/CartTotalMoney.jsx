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
      <div className="summary__title">TỔNG TIỀN GIỎ HÀNG</div>

      <div className="summary__row">
        <span>TỔNG SẢN PHẨM</span>
        <span>{totalQuantity}</span>
      </div>

      <div className="summary__row">
        <span>TỔNG TIỀN HÀNG</span>
        <span>{total.toLocaleString()}₫</span>
      </div>

      <div className="summary__row summary__row--highlight">
        <span>TẠM TÍNH</span>
        <span>{total.toLocaleString()}₫</span>
      </div>

      <div className="summary__note">
        Miễn phí Ship cho đơn hàng từ 3,000,000 VND
      </div>

      <div className="summary__buttons">
        <button onClick={handleContinueShopping}>TIẾP TỤC MUA SẮM</button>
        <button onClick={handleCheckout}>THANH TOÁN</button>
      </div>

      <div className="summary__account">TÀI KHOẢN BLUESOLIS BIKE </div>
    </div>
  );
};

CartSummary.propTypes = {
  total: PropTypes.number.isRequired,
  cartItems: PropTypes.array.isRequired,
};

export default CartSummary;
