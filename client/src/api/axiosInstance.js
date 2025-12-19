import axios from "axios";
import apiRoutes from "./index";

const axiosInstance = axios.create({
  baseURL: apiRoutes.base,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
