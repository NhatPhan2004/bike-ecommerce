import axiosInstance from "../api/axiosInstance";
import apiRoutes from "../api";

const productService = {
  getAll: () => axiosInstance.get(apiRoutes.products.getAll),
  getById: (id) => axiosInstance.get(apiRoutes.products.getById(id)),
};

export default productService;
