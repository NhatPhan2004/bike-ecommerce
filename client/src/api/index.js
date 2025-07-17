const API_BASE_URL = "http://localhost:5000/api";

const apiRoutes = {
  base: API_BASE_URL,

  imageBase: "http://localhost:5000",
  image: {
    product: "/uploads/images/",
    post: "/uploads/images/",
  },

  products: {
    getAll: "/products",
    getById: (id) => `/products/${id}`,
  },

  posts: {
    getAll: "/posts",
    getById: (id) => `/posts/${id}`,
    home: "/posts/home",
  },
};

export default apiRoutes;
