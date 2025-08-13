import axios from "axios";

export const createVnpayPayment = async (amount, orderId, userId) => {
  try {
    const res = await axios.post("/api/payment/create_payment_url", {
      amount,
      orderId,
      userId,
    });

    if (res.data?.paymentUrl) {
      window.location.href = res.data.paymentUrl;
    }
  } catch (err) {
    console.error("Payment error:", err);
  }
};
