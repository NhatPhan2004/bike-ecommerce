import axiosInstance from "../api/axiosInstance";
import apiRoutes from "@api";

const bestsellerService = {
  getAll: () => axiosInstance.get(apiRoutes.bestsellers.getAll),
  getById: (id) => axiosInstance.get(apiRoutes.products.getById(id)),
};

export default bestsellerService;
