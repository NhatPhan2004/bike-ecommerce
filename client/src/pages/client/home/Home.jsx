import "@style/pages/home.scss";
import Banner from "./components/Banner";
import ProductSlider from "./components/ProductSlider";
import Bestseller from "./components/Bestseller";
import BikeIntro from "./components/BikeIntro";
import Review from "./components/Review";
import HomeNewsSection from "../news/HomeNewsSection";

const Home = () => {
  return (
    <>
      <div>
        <Banner />
        <ProductSlider />
        <Bestseller />
        <BikeIntro />
        <Review />
        <HomeNewsSection />
      </div>
    </>
  );
};

export default Home;
