import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";
import CartSteps from "./components/CartSteps";
import citiesData from "@data/citiesData";
import { useCart } from "@contexts/CartContext";
import { useAuth } from "../../../contexts/AuthContext";
import apiRoutes from "@api";
import "@style/pages/shippingInfo.scss";
import "@style/components/cartSummary.scss";
import axios from "axios";

const CheckoutAddress = () => {
  const navigate = useNavigate();
  const { cartItems, total } = useCart();
  const { user } = useAuth();
  const [note, setNote] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    district: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "city" && { district: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, phone, city, district, address, email } = formData;
    if (!fullName || !phone || !city || !district || !address || !email) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!user?.id) {
      alert("You must be logged in to proceed.");
      return;
    }

    console.log("✅ Delivery info submitted:", formData);

    const amount = Math.round(total || 10000);
    const orderId = Date.now().toString();
    const userId = user.id;

    try {
      const res = await axios.post(
        `${apiRoutes.base}${apiRoutes.payment.createUrl}`,
        {
          amount,
          orderId,
          userId,
          fullName,
          phone,
          city,
          district,
          address,
          email,
          note,
          cartItems,
        }
      );

      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      alert("Failed to initiate payment.");
    }
  };

  const handleBackCart = () => {
    window.scrollTo({ top: 0 });
    navigate("/cart");
  };

  const cityOptions = Object.keys(citiesData);
  const districtOptions = formData.city ? citiesData[formData.city] : [];
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="checkout-address container">
      <CartSteps currentStep={2} />

      <div className="checkout-address__content">
        <form className="checkout-address__form" onSubmit={handleSubmit}>
          <div className="checkout-address__title">
            Delivery Information
            <FaShippingFast className="checkout-address__title--icon" />
          </div>
          <div className="checkout-address__row">
            <div className="checkout-address__group">
              <label>Full name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nguyen Van A"
                required
              />
            </div>

            <div className="checkout-address__group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0912345678"
                required
              />
            </div>
          </div>

          <div className="checkout-address__row">
            <div className="checkout-address__group">
              <label>Province / City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose a city --</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="checkout-address__group">
              <label>District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.city}
              >
                <option value="">-- Choose a district --</option>
                {districtOptions.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="checkout-address__group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
          </div>

          <div className="checkout-address__group">
            <label>Detailed address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 ABC Street, Ward XYZ"
              required
            />
          </div>

          <div className="btn-group">
            <button
              className="btn btn--secondary"
              type="button"
              onClick={handleBackCart}
            >
              Back to Cart
            </button>
            <button className="btn btn--primary" type="submit">
              Continue to Payment
            </button>
          </div>
        </form>

        <div className="checkout-address__right">
          <div className="orderSummary">
            <div className="orderSummary__title">ORDER SUMMARY</div>

            <div className="orderSummary__row">
              <span>Subtotal</span>
              <span>{total.toLocaleString()}₫</span>
            </div>

            <div className="orderSummary__row">
              <div className="summary__note">
                Free ship for orders from 3,000,000 VND
              </div>
            </div>

            <div className="orderSummary__row orderSummary__row--total">
              <strong>Total Payable</strong>
              <strong>{total.toLocaleString()}₫</strong>
            </div>

            <div className="orderSummary__row">
              <span>Total Products</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="orderSummary__note">
              <textarea
                placeholder="Add a note to your order (optional)"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="orderSummary__account">BLUESOLIS BIKE ACCOUNT</div>

            <button
              type="button"
              className="btn btn--primary"
              onClick={handleSubmit}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
