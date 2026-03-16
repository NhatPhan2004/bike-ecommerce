// const API_BASE_URL = "http://localhost:5000/api";
const API_BASE_URL = process.env.REACT_APP_API_URL;
const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_URL;

const apiRoutes = {
  base: API_BASE_URL,

  imageBase: IMAGE_BASE_URL,
  image: {
    product: "/uploads/images/",
    post: "/uploads/images/",
    review: "/uploads/images/",
    bestseller: "/uploads/images/",
  },

  products: {
    getAll: "/products",
    getAllAdmin: "/products/admin",
    getById: (id) => `/products/${id}`,
    add: "/products",
    update: (id) => `/products/${id}`,
    delete: (id) => `/products/${id}`,

    brands: "/products/brands",
    loaixes: "/products/loaixes",
  },

  review: {
    imagePath: "/uploads/images/",
    getAll: `/reviews`,
    getFeatured: `/reviews/featured`,
  },

  bestsellers: {
    imagePath: "/uploads/images/",
    getAll: `/bestsellers`,
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
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    changePassword: "/auth/change-password",
    adminLogin: "/auth/admin/login",
    adminRegister: "/auth/admin/register",
    adminProfile: "/auth/admin/profile",
    adminForgotPassword: "/auth/admin/forgot-password",
    adminChangePassword: "/auth/admin/change-password",
  },

  cart: {
    get: "/cart",
    add: "/cart",
    update: (id) => `/cart/${id}`,
    delete: (id) => `/cart/${id}`,
  },

  contact: {
    send: "/contact",
  },

  payment: {
    createUrl: "/payment/create_payment_url",
    vnpReturn: "/payment/vnpay_return",
  },

  stats: {
    main: "/admin/stats",
    completedOrders: "/admin/orders/completed-orders",
    updateStatus: (id) => `/admin/orders/update-status/${id}`,
  },

  statistics: {
    statistics: "/admin/statistics",
  },
};

export default apiRoutes;
