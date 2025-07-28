import React from "react";
import "@style/pages/contact.scss";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import BusinessHours from "./components/BusinessHours";
import GoogleMap from "./components/GoogleMap";

export default function ContactPage() {
  return (
    <section className="contact-page">
      <h1 className="contact-page__heading">CONTACT ME</h1>

      <p className="contact-page__description">
        If you have any questions, please feel free to get in touch with me via
        phone, text, email, the form below, or even on social media!
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
