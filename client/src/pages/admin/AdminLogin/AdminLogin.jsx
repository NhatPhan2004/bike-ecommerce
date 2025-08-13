import React, { useState, useContext } from "react";
import styles from "./adminLogin.module.scss";
import { useAuth } from "@contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import apiRoutes from "@api";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, register, forgotPassword } = useAuth();

  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSwitchForm = (type) => {
    setFormType(type);
    setFormData({ email: "", password: "", name: "" });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formType === "login") {
        const res = await axios.post(
          `${apiRoutes.base}${apiRoutes.auth.adminLogin}`,
          {
            email: formData.email,
            password: formData.password,
          }
        );

        localStorage.setItem("admin", JSON.stringify(res.data.admin));

        navigate("/admin/dashboard");
      } else {
        await axios.post(`${apiRoutes.base}${apiRoutes.auth.adminRegister}`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        alert("Đăng ký thành công!");
        setFormType("login");
      }
    } catch (err) {
      alert("Lỗi: " + err.response?.data?.message || "Không xác định");
    }
    if (formType === "forgot") {
      await forgotPassword(formData.email);
      alert("Đã gửi email đặt lại mật khẩu (nếu tồn tại)");
      return;
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles["admin-login__overlay"]}>
        <div className={styles["admin-login__box"]}>
          {formType === "login" && (
            <>
              <div
                className={`${styles.form} ${
                  formType === "login" ? styles.active : ""
                }`}
              >
                <h2 className={styles["admin-login__title"]}>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles["admin-login__input-group"]}>
                    <i>
                      <FaEnvelope />
                    </i>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles["admin-login__input-group"]}>
                    <i>
                      <FaLock />
                    </i>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <span
                      className={styles["eye-icon"]}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                    </span>
                  </div>

                  <div className={styles["admin-login__options"]}>
                    <label>
                      <input type="checkbox" />
                      Remember me
                    </label>
                    <span onClick={() => handleSwitchForm("forgot")}>
                      Forgot Password?
                    </span>
                  </div>
                  <button type="submit" className={styles["admin-login__btn"]}>
                    Login
                  </button>
                  <div className={styles["admin-login__switch"]}>
                    Don’t have an account?{" "}
                    <span onClick={() => handleSwitchForm("register")}>
                      Register
                    </span>
                  </div>
                </form>
              </div>
            </>
          )}

          {formType === "register" && (
            <>
              <h2 className={styles["admin-login__title"]}>Admin Register</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles["admin-login__input-group"]}>
                  <i>
                    <FaUser />
                  </i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles["admin-login__input-group"]}>
                  <i>
                    <FaEnvelope />
                  </i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles["admin-login__input-group"]}>
                  <i>
                    <FaLock />
                  </i>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span
                    className={styles["eye-icon"]}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <IoEyeSharp /> : <IoEyeOffSharp />}
                  </span>
                </div>

                <button type="submit" className={styles["admin-login__btn"]}>
                  Register
                </button>
                <div className={styles["admin-login__switch"]}>
                  Already have an account?{" "}
                  <span onClick={() => handleSwitchForm("login")}>Login</span>
                </div>
              </form>
            </>
          )}

          {formType === "forgot" && (
            <>
              <h2 className={styles["admin-login__title"]}>Forgot Password</h2>
              <form onSubmit={handleSubmit}>
                <div className={styles["admin-login__input-group"]}>
                  <i>
                    <FaEnvelope />
                  </i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className={styles["admin-login__btn"]}>
                  Send Reset Link
                </button>
                <div className={styles["admin-login__switch"]}>
                  Remembered your password?{" "}
                  <span onClick={() => handleSwitchForm("login")}>Login</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
