import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

const PaymentPage = ({ userId }) => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!amount || amount < 10000) {
      setError("Số tiền phải tối thiểu 10,000 VND");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderId = `ORDER_${Date.now()}`;
      const res = await axios.post("/api/payment/create_payment_url", {
        amount,
        orderId,
        userId,
      });

      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        setError("Không nhận được URL thanh toán từ server");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Lỗi khi khởi tạo thanh toán. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Thanh toán qua VNPay</h2>
      {error && <div className="error-message">{error}</div>}
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="10000"
        placeholder="Nhập số tiền"
      />
      <button onClick={handlePayment} disabled={!amount || isLoading}>
        {isLoading ? <LoadingSpinner /> : "Thanh toán với VNPay"}
      </button>
    </div>
  );
};

export default PaymentPage;
