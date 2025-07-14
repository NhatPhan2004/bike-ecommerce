import axios from "axios";

export const login = async ({ email, password }) => {
  const res = await axios.post("/api/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};

// ✅ THÊM HÀM NÀY
export const register = async ({ name, email, password }) => {
  const res = await axios.post("/api/auth/register", { name, email, password });
  return res.data;
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
  localStorage.removeItem("token");
};

export const getProfile = async () => {
  const token = getToken();
  const res = await axios.get("/api/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
