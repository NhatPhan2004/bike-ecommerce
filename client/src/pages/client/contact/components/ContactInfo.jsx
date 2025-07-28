import "@style/components/contactInfo.scss";

export default function ContactInfo() {
  return (
    <div className="contact-info">
      <h2 className="contact-info__title">CONTACT INFORMATION</h2>
      <div className="contact-info__item">
        <span>Phone</span>
        <div href="tel">0979 797 979</div>
      </div>
      <div className="contact-info__item">
        <span>Email</span>
        <div href="bluesolis@gmail.com">bluesolis@gmail.com</div>
      </div>
      <div className="contact-info__item">
        <span>Address</span>
        <div href="addressShop">Ha Noi City</div>
      </div>
    </div>
  );
}
