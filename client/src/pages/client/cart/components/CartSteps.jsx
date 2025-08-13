import React from "react";
import { FiShoppingCart, FiMapPin, FiCreditCard } from "react-icons/fi";
import "@style/components/cartSteps.scss";

const CartSteps = ({ currentStep = 1 }) => {
  return (
    <div className={`cart-top step-${currentStep}`} id="cartTop">
      <div className="cart-steps__container">
        <div className="cart-steps">
          <div
            className={`cart-step step-1 ${currentStep === 1 ? "active" : ""}`}
          >
            <div className="cart-step__circle">
              <FiShoppingCart />
            </div>
            <p className="cart-step__label">Cart</p>
          </div>

          <div className="cart-step__line"></div>

          <div
            className={`cart-step step-2 ${currentStep === 2 ? "active" : ""}`}
          >
            <div className="cart-step__circle">
              <FiMapPin />
            </div>
            <p className="cart-step__label">Address</p>
          </div>

          <div className="cart-step__line"></div>

          <div
            className={`cart-step step-3 ${currentStep === 3 ? "active" : ""}`}
          >
            <div className="cart-step__circle">
              <FiCreditCard />
            </div>
            <p className="cart-step__label">Pay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSteps;
