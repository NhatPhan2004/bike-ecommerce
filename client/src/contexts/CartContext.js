import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCart } from "../services/cartService";
import { getToken } from "@services/authService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const res = await fetchCart();
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export const useCart = () => useContext(CartContext);
