import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (orderId) {
      // Lấy thông tin hóa đơn từ server
      axios.get(`/api/order/${orderId}`).then((res) => {
        setOrder(res.data);
      });
    }
  }, [orderId]);

  if (!order) return <p>Đang tải hóa đơn...</p>;

  return (
    <div className="invoice">
      <h2>VNPay RESPONSE</h2>
      <p>
        <b>Mã đơn hàng:</b> {order.orderId}
      </p>
      <p>
        <b>Số tiền:</b> {order.amount}
      </p>
      <p>
        <b>Nội dung thanh toán:</b> {order.description}
      </p>
      <p>
        <b>Mã phản hồi:</b> {order.responseCode}
      </p>
      <p>
        <b>Mã GD tại VNPay:</b> {order.transactionNo}
      </p>
      <p>
        <b>Mã Ngân hàng:</b> {order.bankCode}
      </p>
      <p>
        <b>Thời gian thanh toán:</b> {order.payDate}
      </p>
      <p>
        <b>Kết quả:</b>{" "}
        <span style={{ color: order.responseCode === "00" ? "green" : "red" }}>
          {order.responseCode === "00" ? "GD Thành công" : "GD Thất bại"}
        </span>
      </p>
      <button onClick={() => (window.location.href = "/")}>
        Trở lại mua hàng
      </button>
    </div>
  );
}
