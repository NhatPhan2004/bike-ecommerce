import axios from "axios";
import apiRoutes from "../api";

const API = apiRoutes.base;

export const register = (data) =>
  axios.post(`${API}${apiRoutes.auth.register}`, data);

export const login = (data) =>
  axios.post(`${API}${apiRoutes.auth.login}`, data);

export const logout = () => {
  localStorage.removeItem("token");
};

export const forgotPassword = (email) =>
  axios.post(`${API}/auth/forgot-password`, { email });

export const getToken = () => localStorage.getItem("token");

export const getProfile = () =>
  axios.get(`${API}${apiRoutes.auth.profile}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const changePassword = async ({
  email,
  currentPassword,
  newPassword,
}) => {
  const res = await axios.post(`${apiRoutes}/auth/change-password`, {
    email,
    currentPassword,
    newPassword,
  });
  return res.data;
};
