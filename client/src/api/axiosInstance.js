import axios from "axios";
import apiRoutes from "./index";

const axiosInstance = axios.create({
  baseURL: apiRoutes.base, // http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
