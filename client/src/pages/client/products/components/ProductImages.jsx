import React from "react";
import apiRoutes from "@api";

const ProductImage = ({ image, setImage, hinhanh }) => {
  const imageUrl = `${apiRoutes.imageBase}${apiRoutes.image.product}${hinhanh}`;

  return (
    <div className="product__left">
      <div className="product__main-image">
        <img src={image} alt="Main product" />
      </div>
      <div className="product__thumbnails">
        {/* <img src={imageUrl} onClick={() => setImage(imageUrl)} /> */}
      </div>
    </div>
  );
};

export default ProductImage;
