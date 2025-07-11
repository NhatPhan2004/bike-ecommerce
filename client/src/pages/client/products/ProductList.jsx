import React, { useEffect, useState } from "react";
import FilterSidebar from "./components/FilterSidebar";
import { GiCartwheel } from "react-icons/gi";
import ProductCard from "./components/ProductCard";
import productService from "../../../services/productService";
import "../../../style/pages/products.scss";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService
      .getAll()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Product load error:", err));
  }, []);

  return (
    <div className="product-page">
      <div className="product-FilterSidebar">
        <FilterSidebar />
      </div>

      <div className="product-list__container">
        <div className="product-list__line">
          <span className="product-list__icon">
            <GiCartwheel className="wheel-icon" />
          </span>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.bike_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
