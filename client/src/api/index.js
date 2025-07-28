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

  auth: {
    login: "/auth/login",
    register: "/auth/register",
    profile: "/auth/profile",
  },

  cart: {
    get: "/cart",
    add: "/cart",
    update: (id) => `/cart/${id}`,
    delete: (id) => `/cart/${id}`,
  },
};

export default apiRoutes;
