import "../../../style/pages/home.scss";
import { Link } from "react-router-dom";
import Banner from "./components/Banner";
import ProductSlider from "./components/ProductSlider";
import BikeIntro from "./components/BikeIntro";
import HomeNewsSection from "../news/HomeNewsSection";

// import base from "../../../style/base/base.scss";
// import reset from "../../../style/base/reset.scss";

const Home = () => {
  return (
    <>
      <div>
        <Banner />
        <ProductSlider />
        <BikeIntro />
        <HomeNewsSection />
      </div>
    </>
  );
};

export default Home;
