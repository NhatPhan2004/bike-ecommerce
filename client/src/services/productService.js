import axiosInstance from "../api/axiosInstance";
import apiRoutes from "../api";

const productService = {
  getAll: () => axiosInstance.get(apiRoutes.products.getAll),
  getById: (id) => axiosInstance.get(apiRoutes.products.getById(id)),
  create: (data) => axiosInstance.post(apiRoutes.products.create, data),
  update: (id, data) => axiosInstance.put(apiRoutes.products.update(id), data),
  delete: (id) => axiosInstance.delete(apiRoutes.products.delete(id)),
  getFlashSale: () => axiosInstance.get("/products/flashsale"),
};

export default productService;
