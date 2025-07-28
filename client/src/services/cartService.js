import axios from "axios";
import { getToken } from "./authService";
import apiRoutes from "../api";

export const fetchCart = async () => {
  const token = getToken();
  const res = await axios.get(`${apiRoutes.base}${apiRoutes.cart.get}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const addToCart = async (item) => {
  const token = getToken();
  return axios.post(`${apiRoutes.base}${apiRoutes.cart.get}`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCartItem = async (bikeId, quantity) => {
  const token = getToken();
  return axios.put(
    `${apiRoutes.base}${apiRoutes.cart.update(bikeId)}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteCartItem = async (bikeId) => {
  const token = getToken();
  return axios.delete(`${apiRoutes.base}${apiRoutes.cart.delete(bikeId)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
