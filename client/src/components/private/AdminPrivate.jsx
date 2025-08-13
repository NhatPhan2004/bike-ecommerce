// src/components/admin/AdminPrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAdminLoggedIn = true;
  return isAdminLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default AdminPrivateRoute;
