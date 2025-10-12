import { useState } from "react";
import "@style/components/contactForm.scss";
import apiRoutes from "@api";

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

    try {
      const response = await fetch(
        `${apiRoutes.base}${apiRoutes.contact.send}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("❌ Backend Error:", text);
        throw new Error("Server error");
      }

      const data = await response.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
      console.error("❌ Error in handleSubmit:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2 className="contact-form__title">LIÊN LẠC</h2>

      <div className="contact-form__field">
        <label htmlFor="name">Họ và tên*</label>
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
        <label htmlFor="phone">Số điện thoại*</label>
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
        <label htmlFor="message">Tin nhắn của bạn*</label>
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
        {loading ? "Sending..." : "GỬI TIN NHẮN"}
      </button>

      {status && (
        <p className="contact-form__status contact-form__status--success">
          {status}
        </p>
      )}
    </form>
  );
}
