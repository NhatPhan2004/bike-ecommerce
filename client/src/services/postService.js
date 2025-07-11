import axiosInstance from "../api/axiosInstance";
import apiRoutes from "../api";

const postService = {
  getAll: () => axiosInstance.get(apiRoutes.posts.getAll),
  getById: (id) => axiosInstance.get(apiRoutes.posts.getById(id)),
  getHomePosts: () => axiosInstance.get(apiRoutes.posts.home),
};

export default postService;
