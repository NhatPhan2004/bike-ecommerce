import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import apiRoutes from "@api";
import "@style/pages/invoice.scss"; // Giả định alias @style trỏ đến thư mục style

export default function Invoice() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId");
  const [invoice, setInvoice] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(
          `${apiRoutes.base}/payment/invoice/${orderId}`
        );
        setInvoice(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInvoice();
  }, [orderId]);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const headers = {};
      const token = localStorage.getItem("token"); // Nếu cần auth
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      const response = await fetch(
        `${apiRoutes.base}/payment/invoice/pdf/${orderId}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      if (response.status === 404) {
        throw new Error(
          "Hóa đơn không tồn tại (404). Vui lòng kiểm tra lại orderId."
        );
      }
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        throw new Error(`Lỗi từ server (${response.status}): ${errorText}`);
      }

      // Hoàn thiện phần tạo blob và download
      const blob = await response.blob();
      console.log("Blob size:", blob.size);

      if (blob.size === 0) {
        throw new Error("File PDF trống hoặc không hợp lệ");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `hoa-don-${orderId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi tải PDF:", error);
      alert(
        `Có lỗi xảy ra khi tải hóa đơn PDF: ${error.message}. Vui lòng thử lại hoặc liên hệ hỗ trợ.`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  if (!invoice)
    return <p className="invoice-page__loading">Đang tải hóa đơn...</p>;

  return (
    <div className="invoice-page">
      <div className="invoice-page__header">
        <div className="invoice-page__company-info">
          <h2 className="invoice-page__company-name">
            {invoice.company?.name || "BLUESOLIS SHOP"}
          </h2>
          <p className="invoice-page__company-detail">
            Địa chỉ: {invoice.company?.address || "123 Đường ABC, TP.Hà Nội"}
          </p>
          <p className="invoice-page__company-detail">
            SĐT: {invoice.company?.phone || "0979797979"}
          </p>
          <p className="invoice-page__company-detail">
            Mã thuế: {invoice.company?.taxId || "123789456"}
          </p>
        </div>
        <div className="invoice-page__invoice-info">
          <h1 className="invoice-page__title">HÓA ĐƠN THANH TOÁN</h1>
          <p className="invoice-page__invoice-detail">
            Số hóa đơn: #{invoice.invoiceNumber || invoice.orderId}
          </p>
          <p className="invoice-page__invoice-detail">
            Ngày thanh toán: {invoice.timeOrder || "Không có dữ liệu"}
          </p>
        </div>
      </div>

      {/* Thông tin khách hàng */}
      <div className="invoice-page__customer-info">
        <h3 className="invoice-page__section-title">Thông tin khách hàng</h3>
        <p className="invoice-page__customer-info-item">
          Khách hàng: {invoice.user.Hoten}
        </p>
        <p className="invoice-page__customer-info-item">
          Email: {invoice.user.Email}
        </p>
        <p className="invoice-page__customer-info-item">
          Địa chỉ giao hàng: {invoice.user?.Diachi || "Không có dữ liệu"}
        </p>
        <p className="invoice-page__customer-info-item">
          Ngày đặt: {invoice.timeUpdate || "Không có dữ liệu"}
        </p>
      </div>

      {/* Chi tiết sản phẩm dưới dạng bảng */}
      <div className="invoice-page__products">
        <h3 className="invoice-page__section-title">Chi tiết sản phẩm</h3>
        <table className="invoice-page__products-table">
          <thead>
            <tr>
              <th className="invoice-page__products-table-header">
                Tên sản phẩm
              </th>
              <th className="invoice-page__products-table-header">Số lượng</th>
              <th className="invoice-page__products-table-header">
                Giá đơn vị
              </th>
              <th className="invoice-page__products-table-header">
                Thành tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr
                key={item.Bike_id}
                className="invoice-page__products-table-row"
              >
                <td className="invoice-page__products-table-cell">
                  {item.Tenxe}
                </td>
                <td className="invoice-page__products-table-cell">
                  {item.quantity}
                </td>
                <td className="invoice-page__products-table-cell">
                  {item.price.toLocaleString()} VND
                </td>
                <td className="invoice-page__products-table-cell">
                  {(item.price * item.quantity).toLocaleString()} VND
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer với tổng tiền, thuế và ghi chú */}
      <div className="invoice-page__footer">
        <div className="invoice-page__summary">
          <h2 className="invoice-page__total">
            Tổng tiền: {invoice.total.toLocaleString()} VND
          </h2>
          <p className="invoice-page__summary-item">
            Phương thức thanh toán: {invoice.paymentMethod || "Chuyển khoản"}
          </p>
        </div>
        <div className="invoice-page__notes">
          <h3 className="invoice-page__section-title">Ghi chú</h3>
          <p className="invoice-page__notes-text">
            {invoice.notes ||
              "Cảm ơn bạn đã mua hàng! Hóa đơn này là bản sao điện tử. Vui lòng giữ lại để đối chiếu."}
          </p>
        </div>
        <button
          className="invoice-page__download-btn"
          onClick={handleDownloadPdf}
          disabled={isDownloading}
        >
          {isDownloading ? "Đang tải..." : "Tải hóa đơn PDF"}
        </button>
      </div>
    </div>
  );
}
