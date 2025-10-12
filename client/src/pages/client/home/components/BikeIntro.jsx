import React from "react";
import "@style/pages/home.scss";
import { bikeIntro_001 } from "@assets/images";
import { Link } from "react-router-dom";

const BikeIntro = () => {
  return (
    <section className="bike-intro">
      <div className="bike-intro__container">
        <div className="bike-intro__image">
          <img src={bikeIntro_001} alt="MARTIN SPORT STEEL 2.0" />
        </div>
        <div className="bike-intro__content">
          <h2 className="bike-intro__title">MARTIN SPORT STEEL 2.0 –</h2>
          <h3 className="bike-intro__subtitle">
            Sự lựa chọn hoàn hảo cho các chuyến phiêu lưu và đi lại trong thành
            phố của bạn!
          </h3>
          <p className="bike-intro__desc">
            <i>
              "Chiếc xe đạp <span>hybrid</span> hoàn hảo cho những người khám
              phá và đi làm trong đô thị. Với thiết kế hiện đại và các tính năng
              tiên tiến, <span>SUB CROSS 2.0 </span> mang đến trải nghiệm lái xe
              đặc biệt trên mọi địa hình."
            </i>
          </p>
          <ul className="bike-intro__features">
            <li>✓ Khung xe hợp kim nhôm siêu nhẹ và bền bỉ</li>
            <li>✓ Phuộc trước Suntour NEX HLO 63mm êm ái</li>
            <li>
              ✓ Hệ thống truyền động Shimano Deore T6000 30 tốc độ linh hoạt
            </li>
            <li>✓ Phanh thủy lực an toàn, chính xác</li>
            <li>✓ Lốp xe Kenda Booster bám đường tốt</li>
            <li>✓ Ghi đông cong, yên Selle Italia thoải mái</li>
            <li>✓ Trang bị đầy đủ phụ kiện</li>
          </ul>
          <Link to="/product/9" className="bike-intro__btn">
            XEM CHI TIẾT
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BikeIntro;
