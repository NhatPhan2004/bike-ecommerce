import React from "react";
import { updateCartItem, deleteCartItem } from "@services/cartService";
import { useCart } from "@contexts/CartContext";
import "@style/pages/cart.scss";
import apiRoutes from "@api";
import CartSummary from "./components/CartTotalMoney";
import CartSteps from "./components/CartSteps";

const CartPage = () => {
  const { cartItems, fetchCart, total } = useCart();

  const handleQuantityChange = async (bikeId, quantity) => {
    if (quantity < 1) return;
    await updateCartItem(bikeId, quantity);
    fetchCart();
  };

  const handleDelete = async (bikeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product from the cart?"
    );
    if (!confirmDelete) return;
    await deleteCartItem(bikeId);
    fetchCart();
  };

  return (
    <div className="cart">
      <CartSteps currentStep={1} />
      {cartItems.length === 0 ? (
        <p className="cart__empty">There is no product in the basket.</p>
      ) : (
        <div className="cart-page">
          <div className="cart-page__content">
            <div className="cart-page__left">
              <div className="cart__list">
                {cartItems.map((item) => (
                  <div className="cart__item" key={item.bike_id}>
                    <img
                      src={`${apiRoutes.imageBase}${apiRoutes.image.product}${item.img}`}
                      alt={item.tenxe}
                      className="cart__image"
                    />
                    <div className="cart__info">
                      <h3 className="cart__name">{item.tenxe}</h3>
                      <p className="cart__color">
                        Color: <span>{item.mausac}</span>
                      </p>
                      <div className="cart__quantity">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.bike_id,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.bike_id,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                      <p className="cart__price">
                        {item.price.toLocaleString()}₫
                      </p>
                      <button
                        className="cart__delete"
                        onClick={() => handleDelete(item.bike_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart__total">
                  <strong>Total: {total.toLocaleString()}₫</strong>
                </div>
              </div>
            </div>

            <div className="cart-page__right">
              <CartSummary total={total} cartItems={cartItems} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
