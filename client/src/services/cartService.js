import axios from "axios";
import { getToken } from "./authService";

const API_URL = "http://localhost:5000/api/cart";

const getAuthHeader = () => {
  const token = getToken();
  if (!token) return {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchCart = () => axios.get(API_URL, getAuthHeader());

export const addToCart = (data) => axios.post(API_URL, data, getAuthHeader());

export const updateCartItem = (bikeId, quantity) =>
  axios.put(`${API_URL}/${bikeId}`, { quantity }, getAuthHeader());

export const deleteCartItem = (bikeId) =>
  axios.delete(`${API_URL}/${bikeId}`, getAuthHeader());
