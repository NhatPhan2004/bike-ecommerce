import React from "react";
import { CartProvider } from "@contexts/CartContext";
import { AuthProvider } from "@contexts/AuthContext";
import { SearchProvider } from "@contexts/SearchContext";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <AppRoutes />
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
