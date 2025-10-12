import React from "react";
import ProductCard from "../../products/components/ProductCard";

const formatCurrency = (amount) =>
  amount?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const FlashSaleProductList = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <p className="flashsale-page__no-result">
        Không thể tìm thấy sản phẩm phù hợp.
      </p>
    );
  }

  return (
    <>
      {products.map((item) => (
        <div className="flashsale-card" key={item.bike_id}>
          <ProductCard
            product={{
              ...item,
              giaban: item.flashPrice,
              originalPrice: item.originalPrice,
              discount: item.discount,
              isFlashSale: true,
            }}
          />
        </div>
      ))}
    </>
  );
};

export default FlashSaleProductList;
