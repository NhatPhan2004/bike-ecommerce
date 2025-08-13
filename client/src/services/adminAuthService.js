import axios from "axios";
import apiRoutes from "../api";

const API = apiRoutes.base;

export const adminRegister = (data) =>
  axios.post(`${API}${apiRoutes.auth.adminRegister}`, data);

export const adminLogin = (data) =>
  axios.post(`${API}${apiRoutes.auth.adminLogin}`, data);

export const adminLogout = () => {
  localStorage.removeItem("adminToken");
};

export const getAdminToken = () => localStorage.getItem("adminToken");

export const getAdminProfile = () =>
  axios.get(`${API}${apiRoutes.auth.adminProfile}`, {
    headers: { Authorization: `Bearer ${getAdminToken()}` },
  });

export const adminForgotPassword = (email) =>
  axios.post(`${API}${apiRoutes.auth.adminForgotPassword}`, { email });

export const adminChangePassword = ({ email, currentPassword, newPassword }) =>
  axios.post(`${API}${apiRoutes.auth.adminChangePassword}`, {
    email,
    currentPassword,
    newPassword,
  });
