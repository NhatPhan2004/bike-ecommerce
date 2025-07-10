const API_BASE_URL = "http://localhost:5000/api";

const apiRoutes = {
  base: API_BASE_URL,
  products: {
    getAll: "/products",
    getById: (id) => `/products/${id}`,
  },
  posts: {
    getAll: "/posts",
    getById: (id) => `/posts/${id}`,
  },
};

export default apiRoutes;
