import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "@style/components/changePassword.scss";
import apiRoutes from "@api";

const ChangePassword = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [message, setMessage] = useState("");

  const placeholders = {
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm New Password",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiRoutes.base}${apiRoutes.auth.changePassword}`,
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message || "Password changed successfully");

      if (res.data.success || !res.data.error) {
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="change-password-popup">
      <div className="change-password-popup__box">
        <button className="change-password-popup__close" onClick={onClose}>
          ×
        </button>

        <h2 className="change-password-popup__title">Change Password</h2>

        <form onSubmit={handleSubmit}>
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field) => (
              <div className="change-password-popup__input-group" key={field}>
                <i className="bx bxs-lock-alt change-password-popup__icon" />
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  placeholder={placeholders[field]}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                <i
                  onClick={() => togglePassword(field)}
                  className="change-password-popup__toggle"
                >
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </i>
              </div>
            )
          )}

          <button type="submit" className="change-password-popup__button">
            Change Password
          </button>

          {message && (
            <div className="change-password-popup__message">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
