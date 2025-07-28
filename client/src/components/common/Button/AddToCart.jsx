import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { addToCart } from "@services/cartService";
import { useCart } from "@/contexts/CartContext";

const AddToCartButton = ({
  product,
  quantity = 1,
  onShowLogin,
  type = "add",
  className = "",
}) => {
  const { user } = useAuth();
  const { fetchCart } = useCart();

  const handleAction = async () => {
    if (!user) {
      onShowLogin?.();
      return;
    }

    const item = {
      bikeId: product.bike_id,
      quantity,
      price: product.giaban,
    };

    try {
      await addToCart(item);
      await fetchCart();
      console.log("✅ Added to the cart:", item);
    } catch (err) {
      console.error("❌ Add cartoon error:", err.message);
    }
  };

  return (
    <button
      className={`product__btn ${type === "add" ? "add" : "buy"} ${className}`}
      onClick={handleAction}
    >
      {type === "add" ? "ADD TO CART" : "BUY NOW"}
    </button>
  );
};

export default AddToCartButton;
