import React, { useEffect, useState } from "react";
import FilterSidebar from "./components/FilterSidebar";
import { GiCartwheel } from "react-icons/gi";
import ProductCard from "./components/ProductCard";
import productService from "@services/productService";
import "@style/pages/products.scss";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    productService
      .getAll()
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch((err) => console.error("Product load error:", err));
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    const filteredProducts = products.filter((product) => {
      const brandMatch =
        !newFilters.brand ||
        newFilters.brand.length === 0 ||
        newFilters.brand
          .map((b) => b.toLowerCase())
          .includes(product.thuonghieu.toLowerCase());

      const colorMatch =
        !newFilters.color ||
        newFilters.color.length === 0 ||
        newFilters.color.includes(product.mausac);

      const price = parseInt(product.giaban);
      const priceMatch =
        !newFilters.price ||
        newFilters.price.length === 0 ||
        newFilters.price.some((range) => {
          if (range === "under-5m") return price < 5000000;
          if (range === "10m-15m")
            return price >= 10000000 && price <= 15000000;
          if (range === "15m-20m") return price > 15000000 && price <= 20000000;
          if (range === "above-20m") return price > 20000000;
        });
      return brandMatch && colorMatch && priceMatch;
    });
    setFiltered(filteredProducts);
  };

  return (
    <div className="product-page">
      <div className="product-FilterSidebar">
        <FilterSidebar onFilterChange={handleFilterChange} />
      </div>

      <div className="product-list__container">
        <div className="product-list__line">
          <span className="product-list__icon">
            <GiCartwheel className="wheel-icon" />
          </span>
        </div>
        <div className="product-list">
          {filtered.map((product) => (
            <ProductCard key={product.bike_id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
