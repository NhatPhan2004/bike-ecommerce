import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCart as fetchCartService } from "../services/cartService";
import { getToken } from "@services/authService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = getToken();

      if (!token) {
        setCartItems([]);
        return;
      }

      const res = await fetchCartService();
      if (res?.cart?.items) {
        setCartItems(res.cart.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, loading, fetchCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export const useCart = () => useContext(CartContext);
