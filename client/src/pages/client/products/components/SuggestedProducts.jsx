import React, { useEffect, useState } from "react";
import axios from "axios";
import apiRoutes from "@api";
import ProductCard from "../../products/components/ProductCard";
import "@style/components/productCard.scss";

const SuggestedProducts = ({ currentProduct }) => {
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`${apiRoutes.base}/products`);
        const all = res.data;

        const currentPrice = parseFloat(currentProduct.giaban);
        const minPrice = currentPrice * 0.6;
        const maxPrice = currentPrice * 1.4;

        const filtered = all.filter(
          (item) =>
            item.bike_id !== currentProduct.bike_id &&
            parseFloat(item.giaban) >= minPrice &&
            parseFloat(item.giaban) <= maxPrice &&
            (item.thuonghieu === currentProduct.thuonghieu ||
              item.mausac === currentProduct.mausac)
        );

        // Lấy ngẫu nhiên 3 sản phẩm
        const random3 = filtered.sort(() => 0.5 - Math.random()).slice(0, 3);

        setSuggested(random3);
      } catch (error) {
        console.error("Error fetching suggested products:", error);
      }
    };

    fetchSuggestions();
  }, [currentProduct]);

  if (suggested.length === 0) return null;

  return (
    <div className="suggested-products">
      <h2 className="suggested-products__title">SẢN PHẨM CÙNG PHÂN KHÚC</h2>
      <div className="suggested-products__list">
        {suggested.map((product) => (
          <ProductCard key={product.bike_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
