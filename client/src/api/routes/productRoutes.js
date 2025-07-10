const productRoutes = {
  getAll: "/products",
  getById: (id) => `/products/${id}`,
  create: "/products",
  update: (id) => `/products/${id}`,
  delete: (id) => `/products/${id}`,
};

export default productRoutes;
