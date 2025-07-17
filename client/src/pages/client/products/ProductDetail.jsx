import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiRoutes from "@api";
import "@style/pages/productDetail.scss";

import ProductImage from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import LoginRegister from "../auth/LoginRegister";
import SuggestedProducts from "./components/SuggestedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    axios.get(`${apiRoutes.base}/products/${id}`).then((res) => {
      setProduct(res.data);
      setMainImage(
        `${apiRoutes.imageBase}${apiRoutes.image.product}${res.data.hinhanh}`
      );
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!product) return <p>Loading products...</p>;

  return (
    <>
      <div className="product__location">
        <span>Products / </span> {product.tenxe}
      </div>
      <div className="product__container">
        <ProductImage
          image={mainImage}
          setImage={setMainImage}
          hinhanh={product.hinhanh}
        />
        <ProductInfo product={product} onShowLogin={() => setShowLogin(true)} />
        <ProductTabs />
      </div>

      <SuggestedProducts currentProduct={product} />

      {showLogin && (
        <div className="login-popup-center" onClick={() => setShowLogin(false)}>
          <div className="login-popup-box" onClick={(e) => e.stopPropagation()}>
            <LoginRegister />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
