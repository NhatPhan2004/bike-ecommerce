import "@style/pages/home.scss";
import { banner_bg } from "@assets/images";
import "@style/components/buttons.scss";

const Banner = () => {
  return (
    <section className="banner">
      <div className="banner__container">
        <div className="bannerBg">
          <img src={banner_bg} alt="banner" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
