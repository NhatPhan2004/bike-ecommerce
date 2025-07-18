import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "../components/layout/MainLayout";

// Pages
import Home from "../pages/client/home/Home";
import Flashsale from "../pages/client/flashsale/Flashsale";
import NewsDetail from "../pages/client/news/NewsDetail";
import LoginRegister from "../pages/client/auth/LoginRegister";
import Logout from "../pages/client/auth/Logout";
import Cart from "../pages/client/cart/CartPage";
import Contact from "../pages/client/contact/Contact";
import ProductList from "../pages/client/products/ProductList";
import ProductDetail from "../pages/client/products/ProductDetail";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Public routes */}
          <Route index element={<Home />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="flashsale" element={<Flashsale />} />
          <Route path="news/:slug" element={<NewsDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<LoginRegister />} />
          <Route path="logout" element={<Logout />} />
          <Route path="cart" element={<Cart />} />
          {/* Private routes */}
        </Route>
        {/* <Route
  path="/admin"
  element={
    <AdminPrivateRoute>
      <AdminLayout />
    </AdminPrivateRoute>
  }
/> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
