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
            {/* <img src={bannerBg} alt="banner" /> */}
            <img src={bicycle} alt="banner" />

            <div className="banner__overlay"></div>
          </div>

          <div className="banner__content">
            <div className="banner__title">Conquer all roads</div>

            <div className="banner__line">
              <span className="banner__icon">
                <GiCartwheel className="wheel-icon" />
              </span>
            </div>

            <div className="banner__subtitle">
              "A bicycle is more than just a means of transport – it's your
              companion on every journey. We bring you an exceptional cycling
              experience that's safe, inspiring, and full of life."
            </div>

            <div className="btn-section">
              <Link to="/contact" className="btn-section__btn">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
};

export default Banner;
