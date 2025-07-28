import React, { useEffect, useState } from "react";
import {
  fetchCart,
  updateCartItem,
  deleteCartItem,
} from "@services/cartService";
import "@style/pages/cart.scss";
import apiRoutes from "@api";

const CartPage = () => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const loadCart = async () => {
    try {
      const res = await fetchCart();

      if (res?.cart?.items) {
        setItems(res.cart.items);
        setTotal(res.cart.total);
      } else {
        setItems([]);
        setTotal(0);
      }
    } catch (err) {
      console.error("Cart load error:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (bikeId, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(bikeId, quantity);
    loadCart();
  };

  const handleDelete = async (bikeId) => {
    await deleteCartItem(bikeId);
    loadCart();
  };

  return (
    <div className="cart">
      <h2 className="cart__title">Your shopping cart</h2>
      {items.length === 0 ? (
        <p className="cart__empty">There is no product in the basket.</p>
      ) : (
        <div className="cart__list">
          {items.map((item) => (
            <div className="cart__item" key={item.bike_id}>
              <img
                src={`${apiRoutes.imageBase}${apiRoutes.image.product}${item.img}`}
                alt={item.tenxe}
                className="cart__image"
              />
              <div className="cart__info">
                <h3 className="cart__name">{item.tenxe}</h3>
                <p className="cart__color">Color: {item.mausac}</p>
                <div className="cart__quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.bike_id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.bike_id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cart__price">
                  {item.price.toLocaleString()}₫ / pieces
                </p>
                <button
                  className="cart__delete"
                  onClick={() => handleDelete(item.bike_id)}
                >
                  Xoá
                </button>
              </div>
            </div>
          ))}
          <div className="cart__total">
            <strong>Total: {total.toLocaleString()}₫</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
