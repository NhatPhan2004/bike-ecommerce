import React from "react";
import "@style/pages/contact.scss";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import BusinessHours from "./components/BusinessHours";
import GoogleMap from "./components/GoogleMap";

export default function ContactPage() {
  return (
    <section className="contact-page">
      <h1 className="contact-page__heading">LIÊN HỆ TÔI</h1>

      <p className="contact-page__description">
        Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với tôi qua điện thoại,
        tin nhắn, email, biểu mẫu bên dưới hoặc thậm chí trên phương tiện truyền
        thông xã hội!
      </p>

      <div className="contact-page__layout">
        <div className="contact-page__left">
          <ContactForm />
        </div>
        <div className="contact-page__right">
          <ContactInfo />
          <BusinessHours />
        </div>
      </div>

      <div className="contact-page__map">
        <GoogleMap />
      </div>
    </section>
  );
}
