import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "@style/layouts/LoginRegister.scss";
import { useNavigate } from "react-router-dom";
import { login, register } from "@/services/authService";
import { useAuth } from "@/contexts/AuthContext";

const LoginRegister = () => {
  const [activeForm, setActiveForm] = useState("login-form");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const showForm = (formId) => setActiveForm(formId);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(loginData);
      loginUser(res); // Cập nhật context
      navigate(-1); // Quay lại trang trước
    } catch (err) {
      alert("Sai email hoặc mật khẩu!");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(registerData);
      alert("Đăng ký thành công! Mời bạn đăng nhập.");
      setActiveForm("login-form");
    } catch (err) {
      alert("Đăng ký thất bại. Email có thể đã tồn tại.");
    }
  };

  return (
    <div className="login-form__container">
      {/* Login Form */}
      <div
        className={`login-form__box ${
          activeForm === "login-form" ? "active" : ""
        }`}
        id="login-form"
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

      {/* Register Form */}
      <div
        className={`login-form__box ${
          activeForm === "register-form" ? "active" : ""
        }`}
        id="register-form"
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

      {/* Forgot Password Form */}
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
            <input type="email" placeholder="Enter your email" required />
          </div>
          <button className="login-form__btn" type="submit">
            Send Reset Link
          </button>
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
