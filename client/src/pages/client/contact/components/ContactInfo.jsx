import "@style/components/contactInfo.scss";

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <h2 className="contact-info__title">THÔNG TIN LIÊN HỆ</h2>
      <div className="contact-info__item">
        <span>Số điện thoại</span>
        <div href="tel">0979 797 979</div>
      </div>
      <div className="contact-info__item">
        <span>Email</span>
        <div href="bluesolis@gmail.com">bluesolis@gmail.com</div>
      </div>
      <div className="contact-info__item">
        <span>Địa chỉ</span>
        <div href="addressShop">Thành phố Hà Nội</div>
      </div>
    </div>
  );
}
