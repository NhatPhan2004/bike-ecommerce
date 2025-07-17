import React from "react";
import logo_footer from "@assets/images/logo_footer.png";
import "@style/layouts/footer.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaRss,
  FaGooglePlusG,
  FaFlickr,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__column">
          <div className="footer__logo">
            <img src={logo_footer} alt="logo_footer" />
          </div>
        </div>
        <div className="footer__column">
          <ul>
            <li>SHOP</li>
            <li>CONTACT</li>
            <li>CUSTOMER SUPPOST</li>
            <li>FREQUENTLY ASKED QUESTIONS</li>
          </ul>
        </div>
        <div className="footer__column">
          <ul>
            <li>RETURN POLICY</li>
            <li>PRIVACY POLICY</li>
            <li>SERVICE TERMS</li>
            <li>SHIPPING POLICY </li>
          </ul>
        </div>
        <div className="footer__column">
          <ul>
            <li>📍 HA NOI CITY</li>
            <li>📞 0979797979</li>
            <li>📩 BLUESOLIS@gmail.com</li>
            <li>🎥 PROVIDED BY BLUESOLIS</li>
          </ul>
        </div>
        <div className="footer__column">
          <ul>
            <li>ABOUT ME</li>
            <li>CONTACT ME</li>
            <li>AFFILIATES</li>
            <li>RESOURCES</li>
          </ul>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <div className="footer__socials">
          <FaFacebookF />
          <FaTwitter />
          <FaRss />
          <FaGooglePlusG />
          <FaFlickr />
        </div>
        <p className="footer__copyright">© 2025 Bike Ecommerce by BlueSolis</p>
      </div>
    </footer>
  );
};

export default Footer;
