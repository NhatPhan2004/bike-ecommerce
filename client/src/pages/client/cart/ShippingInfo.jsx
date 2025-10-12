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
      alert("Vui lòng điền vào tất cả các trường bắt buộc.");
      return;
    }

    if (!user?.id) {
      alert("Bạn phải đăng nhập để tiếp tục.");
      return;
    }

    console.log("✅ Thông tin giao hàng đã gửi:", formData);

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
      console.error("Lỗi thanh toán:", err.response?.data || err.message);
      alert("Không thanh toán được.");
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
            Thông tin giao hàng
            <FaShippingFast className="checkout-address__title--icon" />
          </div>
          <div className="checkout-address__row">
            <div className="checkout-address__group">
              <label>Họ và tên</label>
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
              <label>Số điện thoại</label>
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
              <label>Tỉnh/ Thành phố</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn Thành phố --</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="checkout-address__group">
              <label>Quận/ Huyện</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                disabled={!formData.city}
              >
                <option value="">-- Chọn quận/ huyện --</option>
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
            <label>Địa chỉ chi tiết</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Đường 123, Khu XYZ"
              required
            />
          </div>

          <div className="btn-group">
            <button
              className="btn btn--secondary"
              type="button"
              onClick={handleBackCart}
            >
              Trở về Giỏ hàng
            </button>
            <button className="btn btn--primary" type="submit">
              Tiếp tục thanh toán
            </button>
          </div>
        </form>

        <div className="checkout-address__right">
          <div className="orderSummary">
            <div className="orderSummary__title">TỔNG TIỀN ĐƠN HÀNG</div>

            <div className="orderSummary__row">
              <span>Tổng tiền</span>
              <span>{total.toLocaleString()}₫</span>
            </div>

            <div className="orderSummary__row">
              <div className="summary__note">
                Miễn phí Ship cho đơn từ 3,000,000 VND
              </div>
            </div>

            <div className="orderSummary__row orderSummary__row--total">
              <strong>Số tiền phải trả</strong>
              <strong>{total.toLocaleString()}₫</strong>
            </div>

            <div className="orderSummary__row">
              <span>Tổng sản phẩm</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="orderSummary__note">
              <textarea
                placeholder="Thêm ghi chú vào đơn hàng của bạn (không bắt buộc)"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="orderSummary__account">
              TÀI KHOẢN BLUESOLIS BIKE{" "}
            </div>

            <button
              type="button"
              className="btn btn--primary"
              onClick={handleSubmit}
            >
              Tiến hành Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
