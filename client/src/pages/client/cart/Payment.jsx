import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const responseCode = searchParams.get("vnp_ResponseCode");
  const amount = Number(searchParams.get("vnp_Amount")) / 100;
  const transactionNo = searchParams.get("vnp_TransactionNo");

  const isSuccess = responseCode === "00";

  return (
    <div className="payment-result">
      <h1>{isSuccess ? "Successful payment 🎉" : "Payment Failed ❌"}</h1>
      <p>
        <strong>Trading Code:</strong> {transactionNo}
      </p>
      <p>
        <strong>Amount:</strong> {amount.toLocaleString()} VNĐ
      </p>
      <p>
        <strong>Response code:</strong> {responseCode}
      </p>

      <button onClick={() => (window.location.href = "/")}>Back to Home</button>
    </div>
  );
};

export default PaymentSuccess;
