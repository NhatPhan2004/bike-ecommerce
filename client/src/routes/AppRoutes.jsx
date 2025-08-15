import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../components/layouts/MainLayout";
import AdminLayout from "../components/layouts/AdminLayout";
import AdminPrivateRoute from "../components/private/AdminPrivate";

// Pages - Client
import Home from "../pages/client/home/Home";
import Flashsale from "../pages/client/flashsale/Flashsale";
import NewsDetail from "../pages/client/news/NewsDetail";
import LoginRegister from "../pages/client/auth/LoginRegister";
import Logout from "../pages/client/auth/Logout";
import Cart from "../pages/client/cart/CartPage";
import CheckoutAddress from "../pages/client/cart/ShippingInfo";
import Contact from "../pages/client/contact/Contact";
import ProductList from "../pages/client/products/ProductList";
import ProductDetail from "../pages/client/products/ProductDetail";
import PaymentSuccess from "../pages/client/cart/PaymentSuccess";

// Pages - Admin
import AdminLogin from "../pages/admin/AdminLogin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import Customers from "../pages/admin/Customers/Customers";
import Orders from "../pages/admin/Orders/Orders";
import Products from "../pages/admin/Products/Products";
import Statistics from "../pages/admin/Statistics/Statistics";
import EditProduct from "../pages/admin/Products/components/EditProduct";
import AddProduct from "../pages/admin/Products/components/AddProduct";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* CLIENT ROUTES */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="flashsale" element={<Flashsale />} />
          <Route path="news/:slug" element={<NewsDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginRegister />} />
          <Route path="logout" element={<Logout />} />
          <Route path="cart" element={<Cart />} />
          <Route path="address" element={<CheckoutAddress />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
