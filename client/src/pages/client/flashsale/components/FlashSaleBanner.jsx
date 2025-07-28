import React from "react";
import Countdown from "./Countdown";
import { bannerFl, bikeFl } from "@assets/images";

const FlashSaleBanner = () => {
  return (
    <div className="flashsale-page__banner">
      <img
        src={bannerFl}
        alt="Flash Sale Banner"
        className="flashsale-page__banner-img"
      />
      <img
        src={bikeFl}
        alt="Flash Sale Bike"
        className="flashsale-page__banner-bike"
      />
      <Countdown duration={18 * 3600 + 36 * 60 + 25} />
    </div>
  );
};

export default FlashSaleBanner;
