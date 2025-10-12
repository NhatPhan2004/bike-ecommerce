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
            <li>CỬA HÀNG</li>
            <li>LIÊN HỆ</li>
            <li>HỖ TRỢ KHÁCH HÀNG</li>
            <li>NHỮNG CÂU HỎI THƯỜNG GẶP</li>
          </ul>
        </div>
        <div className="footer__column">
          <ul>
            <li>CHÍNH SÁCH ĐỔI TRẢ</li>
            <li>CHÍNH SÁCH BẢO MẬT</li>
            <li>ĐIỀU KHOẢN DỊCH VỤ</li>
            <li>CHÍNH SÁCH GIAO HÀNG </li>
          </ul>
        </div>
        <div className="footer__column">
          <ul>
            <li>📍 THÀNH PHỐ HÀ NỘI</li>
            <li>📞 0979797979</li>
            <li>📩 BLUESOLIS@gmail.com</li>
            <li>🎥 ĐƯỢC CUNG CẤP BỞI BLUESOLIS</li>
          </ul>
        </div>
        <div className="footer__column">
          <ul>
            <li>GIỚI THIỆU</li>
            <li>LIÊN HỆ</li>
            <li>AFFILIATES</li>
            <li>NGUỒN TÀI NGUYÊN</li>
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
