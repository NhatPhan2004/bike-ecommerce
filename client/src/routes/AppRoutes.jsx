import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/client/home/Home";
import Flashsale from "../pages/client/flashsale/Flashsale";
import NewsDetail from "../pages/client/news/NewsDetail";
import LoginRegister from "../pages/client/auth/LoginRegister";
import Cart from "../pages/client/cart/Cart";
import Shop from "../pages/client/contact/Contact";
import ProductList from "../pages/client/products/ProductList";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="flashsale" element={<Flashsale />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="contact" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="auth" element={<LoginRegister />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
