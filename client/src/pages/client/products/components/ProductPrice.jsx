const ProductPrice = ({ price }) => {
  const current = parseInt(price);
  const old = current * 1.25;
  const savings = old - current;

  return (
    <div className="product__price">
      <span className="product__price--current">
        {current.toLocaleString("vi-VN")}đ
      </span>
      <span className="product__price--old">
        {old.toLocaleString("vi-VN")}đ
      </span>
      <span className="product__price--discount">-30%</span>
      <span className="product__price--savings">
        Tiết kiệm: {savings.toLocaleString("vi-VN")}đ
      </span>
    </div>
  );
};

export default ProductPrice;
