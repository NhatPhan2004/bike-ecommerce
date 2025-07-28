import { useState } from "react";
import "@style/components/contactForm.scss";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    setTimeout(() => {
      setLoading(false);
      setStatus("Message sent successfully!");
      setForm({ name: "", phone: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="contact-form__title">GET IN TOUCH</h2>

      <div className="contact-form__field">
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="phone">Phone Number*</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="contact-form__field">
        <label htmlFor="message">Your Message*</label>
        <textarea
          id="message"
          name="message"
          rows="4"
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="contact-form__button" disabled={loading}>
        {loading ? "Sending..." : "SEND MESSAGE"}
      </button>

      {status && (
        <p className="contact-form__status contact-form__status--success">
          {status}
        </p>
      )}
    </form>
  );
}
