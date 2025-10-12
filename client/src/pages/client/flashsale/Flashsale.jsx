import React, { useState, useEffect, useMemo } from "react";
import productService from "@services/productService";
import FilterSidebar from "../products/components/FilterSidebar";
import flashsaleData from "../../../data/flashsaleData";
import FlashSaleBanner from "./components/FlashSaleBanner";
import FlashSaleProductList from "./components/FlashSaleProductList";
import "@style/pages/flashsale.scss";

const FlashSalePage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getAll();
        const allProducts = res.data || [];

        const flashSaleIds = flashsaleData.map((item) => item.bike_id);

        const selected = allProducts
          .filter((product) => flashSaleIds.includes(product.bike_id))
          .slice(0, 9)
          .map((product) => {
            const flashData = flashsaleData.find(
              (item) => item.bike_id === product.bike_id
            );
            const discount = flashData?.discount || 0;
            const giaban = Number(product.giaban);
            const estimatedOriginal = giaban / 0.7;
            const originalPrice =
              Math.round(estimatedOriginal / 100000) * 100000;
            const flashPrice = Math.round(originalPrice * (1 - discount / 100));
            return {
              ...product,
              originalPrice,
              flashPrice,
              discount,
            };
          });

        setProducts(selected);
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const brandMatch =
        !filters.brand ||
        filters.brand.length === 0 ||
        filters.brand
          .map((b) => b.toLowerCase())
          .includes(product.thuonghieu.toLowerCase());

      const colorMatch =
        !filters.color ||
        filters.color.length === 0 ||
        filters.color.includes(product.mausac);

      const price = parseInt(product.giaban);
      const priceMatch =
        !filters.price ||
        filters.price.length === 0 ||
        filters.price.some((range) => {
          if (range === "under-5m") return price < 5000000;
          if (range === "10m-15m")
            return price >= 10000000 && price <= 15000000;
          if (range === "15m-20m") return price > 15000000 && price <= 20000000;
          if (range === "above-20m") return price > 20000000;
          return false;
        });

      return brandMatch && colorMatch && priceMatch;
    });
  }, [products, filters]);

  return (
    <div className="flashsale-page">
      <FlashSaleBanner />

      <div className="flashsale-page__content container">
        <div className="flashsale-page__filter">
          <FilterSidebar
            products={products}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="flashsale-page__products">
          <FlashSaleProductList products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default FlashSalePage;
