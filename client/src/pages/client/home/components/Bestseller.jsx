import React, { useEffect, useState } from "react";
import apiRoutes from "@api";
import bestsellerService from "@services/bestsellerService";
import "@style/components/bestseller.scss";

const BestsellerItem = ({ product }) => {
  const [errorCount, setErrorCount] = useState(0);
  if (!product) return null;

  const price = Math.round(Number(product.giaban || 0));
  const discountPercent = 30;
  const oldPrice =
    Math.round(price / (1 - discountPercent / 100) / 100000) * 100000;

  const imageUrl = `${apiRoutes.imageBase}${apiRoutes.image.bestseller}${product.hinhanh}`;

  const handleImageError = (e) => {
    if (errorCount === 0) {
      e.target.src = "https://via.placeholder.com/300x200?text=Bike+Image";
      setErrorCount(1);
    }
  };

  return (
    <div className="product-card product-card--static">
      <div className="product-card__brand">BIKE BLUESOLIS</div>
      <div className="product-card__image">
        <img src={imageUrl} onError={handleImageError} alt={product.tenxe} />
      </div>
      <div className="product-card__info">
        <div className="product-card__title">
          <span>🔥 </span>
          {product.tenxe}
          <span> 🔥</span>
        </div>
        <div className="product-card__rating">★★★★★</div>
        <div className="product-card__price">
          <span className="product-card__price--current">
            {price.toLocaleString("vi-VN")}đ
          </span>
          <span className="product-card__price--old">
            {oldPrice.toLocaleString("vi-VN")}đ
          </span>
          <span className="product-card__sold">
            Đã bán {product.sold_count || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

const Bestseller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bestsellerService
      .getAll()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Bestseller error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className="loading">Đang tải sản phẩm bán chạy...</div>;
  if (products.length === 0) return null;

  return (
    <section className="bestseller-section">
      <div className="container">
        <h2 className="section-title">
          <span>💥</span>SẢN PHẨM BÁN CHẠY
        </h2>
        <div className="bestseller-grid">
          {products.map((item) => (
            <BestsellerItem key={item.bike_id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
