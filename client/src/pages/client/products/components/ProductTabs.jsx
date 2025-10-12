// Tabs chuyển đổi giữa mô tả, đổi trả, giao hàng
import React, { useState } from "react";
import "@style/components/productTabs.scss";

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="tabs__content active">
            <p>
              Trong thế giới phát triển nhanh ngày nay, nhu cầu về xe đạp vượt
              ra ngoài phương tiện giao thông đơn thuần - chúng phải mang lại sự
              tiện lợi, thẩm mỹ và sự thoải mái vượt trội. Alight 3 DD Disc là
              giải pháp đạp xe đô thị tối ưu dành cho phụ nữ hiện đại, đáp ứng
              thành thạo tất cả những kỳ vọng này.
            </p>
            <h3>CÁC TÍNH NĂNG NỔI BẬT:</h3>
            <ul>
              <li>
                <strong>Hệ thống truyền động Shimano 3x7 tốc độ</strong> (21 cấp
                số) giúp người lái dễ dàng điều chỉnh tốc độ phù hợp với nhiều
                điều kiện địa hình, từ đường bằng phẳng đến những con dốc nhẹ
                trong thành phố.
              </li>
              <li>
                <strong>Phanh đĩa cơ (disc brake)</strong> mang lại lực hãm
                mạnh, ổn định, đặc biệt an toàn khi đi trong điều kiện thời tiết
                mưa hoặc đường trơn trượt.
              </li>
              <li>
                <strong>Bánh xe 700C </strong> với lốp mỏng và vân nhẹ, giúp
                tăng tốc nhanh, lăn êm và tiết kiệm sức hơn trên các cung đường
                đô thị.
              </li>
              <li>
                <strong>Chân chống</strong> tích hợp sẵn, thuận tiện cho việc
                dừng xe bất kỳ lúc nào.
              </li>
            </ul>
            <h3>Phù hợp với:</h3>
            <ul>
              <li>
                {" "}
                Nữ giới muốn tìm một chiếc xe đạp đẹp, nhẹ, dễ điều khiển và đa
                dụng.
              </li>
              <li>
                Phù hợp với dân văn phòng, sinh viên, người dùng xe cho mục đích
                đi lại hàng ngày và rèn luyện sức khỏe.
              </li>
              <li>
                Người mới bắt đầu chơi xe đạp và muốn có trải nghiệm thoải mái,
                ổn định.
              </li>
            </ul>
          </div>
        );
      case 1:
        return (
          <div className="tabs__content active">
            <p>
              BlueSolis Bike cam kết mang đến trải nghiệm mua sắm thuận tiện và
              nhanh chóng cho khách hàng thông qua các chính sách giao hàng linh
              hoạt và chuyên nghiệp. Dưới đây là thông tin chi tiết về chính
              sách giao hàng:
            </p>
            <h3>1. Bảo hiểm giao hàng</h3>
            <ul>
              <li>
                BlueSolis Bike cung cấp dịch vụ giao hàng trên toàn quốc, bao
                gồm cả khu vực thành thị và nông thôn.
              </li>
            </ul>
            <h3>2. Thời gian giao hàng</h3>
            <ul>
              <li>
                <strong>Khu đô thị:</strong> Đối với các đơn hàng trong thành
                phố, thời gian giao hàng là 1–2 ngày làm việc.
              </li>
              <li>
                <strong>Ngoại ô và các tỉnh khác:</strong> Thời gian giao hàng
                dao động từ 3–5 ngày làm việc tùy thuộc vào khoảng cách và điều
                kiện vận chuyển.
              </li>
            </ul>
            <h3>3. Phí giao hàng</h3>
            <ul>
              <li>
                <strong>Khu đô thị:</strong> Miễn phí vận chuyển cho đơn hàng có
                giá trị từ 500.000 đồng trở lên. Đối với đơn hàng dưới 500.000
                đồng, phí vận chuyển sẽ được tính dựa trên khoảng cách.
              </li>
              <li>
                <strong>Ngoại ô và các tỉnh khác:</strong> Phí vận chuyển dựa
                trên trọng lượng, kích thước và quãng đường giao hàng của sản
                phẩm. Khách hàng sẽ được thông báo chi phí vận chuyển cụ thể
                trước khi hoàn tất đơn hàng.
              </li>
            </ul>
            <h3>4. Bao bì sản phẩm</h3>
            <ul>
              <li>
                Sản phẩm được đóng gói cẩn thận đảm bảo an toàn trong quá trình
                vận chuyển. Đối với các mặt hàng dễ vỡ hoặc có giá trị cao,
                chúng tôi áp dụng các biện pháp bảo vệ đặc biệt.
              </li>
            </ul>
            <h3>5. Theo dõi đặt hàng</h3>
            <ul>
              <li>
                Khách hàng có thể theo dõi trạng thái đơn hàng của mình thông
                qua mã theo dõi được cung cấp sau khi đơn hàng được vận chuyển.
                Thông tin này sẽ được gửi qua email hoặc SMS.
              </li>
            </ul>
            <h3>6. Chính sách đổi trả</h3>
            <ul>
              <li>
                Trong trường hợp sản phẩm bị hư hỏng, không chính xác hoặc không
                khớp, khách hàng có thể yêu cầu đổi trả trong vòng 7 ngày kể từ
                ngày giao hàng. BlueSolis Bike sẽ chi trả chi phí vận chuyển cho
                việc trả lại do lỗi của chúng tôi.
              </li>
            </ul>
            <h3>7. Hỗ trợ khách hàng</h3>
            <ul>
              <li>
                Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ liên quan đến các
                vấn đề giao hàng, vui lòng liên hệ với nhóm dịch vụ khách hàng
                của BlueSolis Bike qua điện thoại hoặc email. Chúng tôi luôn sẵn
                sàng hỗ trợ bạn.
              </li>
            </ul>
            <p>
              Chúng tôi mong muốn mang lại sự hài lòng tuyệt đối cho khách hàng
              với mọi đơn hàng. Hãy tin tưởng và chọn BlueSolis Bike cho hành
              trình đạp xe của bạn!
            </p>
          </div>
        );

      case 2:
        return (
          <div className="tabs__content active">
            <h3>1. Điều kiện đổi trả</h3>
            <p>
              Khách hàng được yêu cầu kiểm tra tình trạng hàng hóa và có thể đổi
              trả sản phẩm tại thời điểm giao hàng/nhận hàng trong các trường
              hợp sau:
            </p>
            <ul>
              <li>
                Mặt hàng không đúng loại hoặc mẫu mã như đã đặt hàng, hoặc không
                khớp với mô tả trên website tại thời điểm mua hàng.
              </li>
              <li>
                Số lượng không chính xác, hoặc bộ mặt hàng không đầy đủ so với
                đơn hàng.
              </li>
              <li>
                Sản phẩm bị hư hỏng bên ngoài như bao bì bị rách, bong tróc,
                vỡ,...
              </li>
            </ul>
            <p>
              Khách hàng có trách nhiệm cung cấp các chứng từ chứng minh vấn đề
              để hoàn tất quá trình đổi trả.
            </p>

            <h3>2. Quy định về thời gian thông báo và đổi trả sản phẩm</h3>
            <ul>
              <li>
                <strong>Thời gian thông báo đổi trả:</strong> trong vòng 48 giờ
                kể từ thời điểm nhận được sản phẩm, trong các trường hợp như
                thiếu phụ kiện, quà tặng, hư hỏng sản phẩm.
              </li>
              <li>
                <strong>Thời gian gửi lại sản phẩm:</strong> trong vòng 14 ngày
                kể từ ngày nhận được sản phẩm.
              </li>
              <li>
                <strong>Địa chỉ trả hàng:</strong> Khách hàng có thể trả lại sản
                phẩm trực tiếp tại văn phòng/cửa hàng của chúng tôi hoặc gửi qua
                đường bưu điện.
              </li>
            </ul>
            <p>
              Nếu bạn có bất kỳ phản hồi hoặc khiếu nại nào liên quan đến chất
              lượng sản phẩm, vui lòng liên hệ hotline chăm sóc khách hàng của
              chúng tôi.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="tabs">
      <div className="tabs__nav">
        <div
          className={`tabs__tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          Mô tả sản phẩm
        </div>
        <div
          className={`tabs__tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Chính sách giao hàng
        </div>
        <div
          className={`tabs__tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
        >
          Chính sách đổi trả
        </div>
      </div>

      <div className="tabs__body">{renderContent()}</div>
    </div>
  );
};

export default ProductTabs;
