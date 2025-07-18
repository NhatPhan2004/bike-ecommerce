import React from "react";
import { CartProvider } from "@contexts/CartContext";
import { AuthProvider } from "@contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
