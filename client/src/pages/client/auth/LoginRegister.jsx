import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "../../../style/layouts/LoginRegister.scss";

const LoginRegister = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [activeForm, setActiveForm] = useState("login-form");

  const showForm = (formId) => {
    setActiveForm(formId);
  };

  return (
    <div className="login-form__container">
      <div
        className={`login-form__box ${
          activeForm === "login-form" ? "active" : ""
        }`}
        id="login-form"
      >
        <form className="login-form__form">
          <h1 className="login-form__title">Login</h1>
          <div className="login-form__input-box">
            <i className="bx bxs-user"></i>
            <input type="text" placeholder="Username" />
          </div>
          <div className="login-form__input-box">
            <i className="bx bxs-lock-alt"></i>
            <input type="password" placeholder="Password" />
          </div>
          <div className="login-form__remember-forgot-box">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <span
              className="login-form__link"
              onClick={() => showForm("forgot-password-form")}
            >
              Forgot Password?
            </span>
          </div>
          <button className="login-form__btn">Login</button>
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

      <div
        className={`login-form__box ${
          activeForm === "register-form" ? "active" : ""
        }`}
        id="register-form"
      >
        <form className="login-form__form">
          <h1 className="login-form__title">Register</h1>
          <div className="login-form__input-box">
            <i className="bx bxs-user"></i>
            <input type="text" placeholder="Name" />
          </div>
          <div className="login-form__input-box">
            <i className="bx bxs-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>
          <div className="login-form__input-box">
            <i className="bx bxs-lock-alt"></i>
            <input type="password" placeholder="Password" />
          </div>
          <div className="login-form__remember-forgot-box">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
          </div>
          <button className="login-form__btn">Register</button>
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

      <div
        className={`login-form__box ${
          activeForm === "forgot-password-form" ? "active" : ""
        }`}
        id="forgot-password-form"
      >
        <form className="login-form__form">
          <h1 className="login-form__title">Forgot Password</h1>
          <div className="login-form__input-box">
            <i className="bx bxs-envelope"></i>
            <input type="email" placeholder="Enter your email" />
          </div>
          <button className="login-form__btn">Send Reset Link</button>
          <p className="login-form__login">
            Remembered your password?{" "}
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
