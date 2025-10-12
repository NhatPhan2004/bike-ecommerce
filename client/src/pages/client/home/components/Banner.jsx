import "@style/pages/home.scss";
// import bannerBg from "@assets/images/bannerBg.jpg";
import { bicycle } from "../../../../assets/images";
import { GiCartwheel } from "react-icons/gi";
import { Link } from "react-router-dom";
import "@style/components/buttons.scss";

const Banner = () => {
  return (
    <>
      <section className="banner">
        <div className="banner__container">
          <div className="banner__images">
            <img src={bicycle} alt="banner" />

            <div className="banner__overlay"></div>
          </div>

          <div className="banner__content">
            <div className="banner__title">CHINH PHỤC MỌI NẺO ĐƯỜNG</div>

            <div className="banner__line">
              <span className="banner__icon">
                <GiCartwheel className="wheel-icon" />
              </span>
            </div>

            <div className="banner__subtitle">
              "Xe đạp không chỉ là phương tiện di chuyển – nó là người bạn đồng
              hành của bạn trên mọi hành trình. Chúng tôi mang đến cho bạn trải
              nghiệm đạp xe đặc biệt, an toàn, truyền cảm hứng và tràn đầy sức
              sống."
            </div>

            <div className="btn-section">
              <Link to="/contact" className="btn-section__btn">
                {/* Shop now */}
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
