import React from "react";
import "../../../../style/pages/home.scss";
import { bikeIntro_004 } from "../../../../assets/images";
import { Link } from "react-router-dom";

const BikeIntro = () => {
  return (
    <section className="bike-intro">
      <div className="bike-intro__container">
        <div className="bike-intro__image">
          <img src={bikeIntro_004} alt="SCOTT SUB CROSS 2.0" />
        </div>
        <div className="bike-intro__content">
          <h2 className="bike-intro__title">SCOTT SUB CROSS 2.0 –</h2>
          <h3 className="bike-intro__subtitle">
            The perfect choice for your adventure trips and city commuting!
          </h3>
          <p className="bike-intro__desc">
            <i>
              "The perfect <span>hybrid</span> bike for explorers and urban
              commuters. With its modern design and advanced features, the{" "}
              <span>SUB CROSS 2.0 </span> delivers an exceptional riding
              experience on any terrain."
            </i>
          </p>
          <ul className="bike-intro__features">
            <li>Ultra-lightweight and durable aluminum alloy frame</li>
            <li>
              Suntour NEX HLO 63mm suspension fork - smooth riding comfort
            </li>
            <li>
              Shimano Deore T6000 30-speed drivetrain – precise and versatile
              shifting
            </li>
            <li>Hydraulic disc brakes - safe and precise stopping power</li>
            <li>
              Kenda Booster tires - excellent road grip for all conditions
            </li>
            <li>Curved handlebar with Selle Italia comfort saddle</li>
            <li>Fully equipped with accessories</li>
          </ul>
          <Link to="#" className="bike-intro__btn">
            VIEW DETAILS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BikeIntro;
