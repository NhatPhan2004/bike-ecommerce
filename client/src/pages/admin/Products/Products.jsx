import React, { useEffect, useState, useRef } from "react";
import styles from "./Products.module.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import apiRoutes from "@api";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import anime from "animejs";
import SplitType from "split-type";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  const titleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const split = new SplitType(titleRef.current, { types: "chars" });

    anime({
      targets: split.chars,
      translateY: ["75%", "0%"],
      opacity: [0, 1],
      duration: 750,
      easing: "easeOutExpo",
      delay: anime.stagger(50),
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${apiRoutes.base}${apiRoutes.products.getAllAdmin}`)
      .then((res) => {
        console.log("API response data:", res.data);
        setProducts(res.data.products || res.data);
      })
      .catch((err) => console.error("Lỗi tải sản phẩm:", err));
  }, []);

  const handleSearch = (e) => setSearchKeyword(e.target.value.toLowerCase());

  const filteredProducts = Array.isArray(products)
    ? products.filter((p) => {
        const combined = (
          (p.tenxe || "") +
          " " +
          (p.thuonghieu || "") +
          " " +
          (p.tenloaixe || "")
        ).toLowerCase();

        return combined.includes(searchKeyword);
      })
    : [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this product?")) {
      axios
        .delete(apiRoutes.base + apiRoutes.products.delete(id))
        .then(() => {
          alert("Successful product deletion");
          setProducts(products.filter((p) => p.bike_id !== id));
        })
        .catch((err) => {
          alert("Remove failed products");
          console.error(err);
        });
    }
  };

  const fetchProducts = () => {
    axios
      .get(apiRoutes.base + apiRoutes.products.getAll)
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch((err) => console.error(err));
  };
  const closeEditModal = () => {
    setEditingProduct(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const id = editingProduct.bike_id;

    axios
      .put(apiRoutes.base + apiRoutes.products.update(id), editingProduct)
      .then(() => {
        alert("Successful product updates");
        setProducts((prev) =>
          prev.map((p) => (p.bike_id === id ? editingProduct : p))
        );
        fetchProducts();
        closeEditModal();
      })
      .catch((err) => {
        alert("Update failure");
        console.error(err);
      });
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.header_topbar}>
          <div className={styles.topbar}>
            <input type="text" placeholder="Search..." onInput={handleSearch} />
          </div>
          <Link to="/admin/products/add" className={styles.addButton}>
            <FaPlus /> Add Product
          </Link>
        </div>

        <section className={styles.content}>
          <h2 ref={titleRef} className={`text-xl ${styles.title}`}>
            Products
          </h2>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product name</th>
                <th>Trademark</th>
                <th>Bicycle</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.bike_id}>
                  <td>{p.bike_id}</td>
                  <td>{p.tenxe}</td>
                  <td>{p.thuonghieu}</td>
                  <td>{p.tenloaixe}</td>
                  <td>{parseInt(p.giaban).toLocaleString("vi-VN")}₫</td>
                  <td>{p.soluong}</td>

                  <td>
                    <img
                      src={`${apiRoutes.imageBase}${apiRoutes.image.product}${p.hinhanh}`}
                      alt={p.tenxe}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/products/edit/${p.bike_id}`)
                      }
                      className={styles.btn__edit}
                      title="Edit"
                    >
                      <CiEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.bike_id)}
                      className={styles.btn__delete}
                      title="Delete"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ProductList;
