import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "@style/layouts/LoginRegister.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import apiRoutes from "@api";

const LoginRegister = ({ onClose }) => {
  const [activeForm, setActiveForm] = useState("login-form");

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const showForm = (formId) => setActiveForm(formId);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(loginData);
      if (onClose) onClose();
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed.";
      alert(message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, address } = registerData;

    try {
      await axios.post(`${apiRoutes.base}${apiRoutes.auth.register}`, {
        name,
        email,
        password,
        phone,
        address,
      });

      alert("Registration successful");
      setRegisterData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration error");
    }
  };

  return (
    <div className="login-form__container">
      {/* LOGIN */}
      <div
        className={`login-form__box ${
          activeForm === "login-form" ? "active" : ""
        }`}
      >
        <form className="login-form__form" onSubmit={handleLogin}>
          <h1 className="login-form__title">Login</h1>
          <div className="login-form__input-box">
            <i className="bx bxs-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="login-form__input-box">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              required
            />
          </div>
          <button className="login-form__btn" type="submit">
            Login
          </button>
          <p className="login-form__register">
            Don't have an account?{" "}
            <span
              className="login-form__link"
              onClick={() => showForm("register-form")}
            >
              Register
            </span>
          </p>
        </form>
      </div>

      {/* REGISTER */}
      <div
        className={`login-form__box ${
          activeForm === "register-form" ? "active" : ""
        }`}
      >
        <form className="login-form__form" onSubmit={handleRegister}>
          <h1 className="login-form__title">Register</h1>

          <div className="login-form__input-box">
            <i className="bx bxs-user"></i>
            <input
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="login-form__input-box">
            <i className="bx bxs-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="login-form__input-box">
            <i className="bx bxs-lock-alt"></i>
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="login-form__input-box">
            <i className="bx bxs-phone"></i>
            <input
              type="text"
              placeholder="Phone"
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
              required
            />
          </div>

          <div className="login-form__input-box">
            <i className="bx bxs-map"></i>
            <input
              type="text"
              placeholder="Address"
              value={registerData.address}
              onChange={(e) =>
                setRegisterData({ ...registerData, address: e.target.value })
              }
              required
            />
          </div>

          <button className="login-form__btn" type="submit">
            Register
          </button>

          <p className="login-form__login">
            Already have an account?{" "}
            <span
              className="login-form__link"
              onClick={() => showForm("login-form")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
