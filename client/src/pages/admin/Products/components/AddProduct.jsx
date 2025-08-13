import React, { useState, useEffect } from "react";
import axios from "axios";
import apiRoutes from "@api";
import styles from "../Products.module.scss";

const AddProduct = () => {
  const [form, setForm] = useState({
    Bike_id: "",
    Tenxe: "",
    Brand_id: "",
    Loaixe_id: "",
    Giaban: "",
    Soluong: "",
  });
  const [brands, setBrands] = useState([]);
  const [loaixes, setLoaixes] = useState([]);
  const [hinhanh, setHinhanh] = useState(null);

  useEffect(() => {
    axios
      .get(apiRoutes.base + apiRoutes.products.brands)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];

        setBrands(list);
      })
      .catch((err) => console.error("Brand Load Error:", err));

    axios
      .get(apiRoutes.base + apiRoutes.products.loaixes)
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setLoaixes(list);
      })
      .catch((err) => console.error("Vehicle type loading error:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setHinhanh(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (hinhanh) data.append("hinhanh", hinhanh);

    try {
      await axios.post(apiRoutes.base + apiRoutes.products.add, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Add a successful product");
      window.location.href = "/admin/products";
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className={styles.addProductPage}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Add new product</h2>

        <input
          type="text"
          name="Bike_id"
          placeholder="Product Code"
          value={form.Bike_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Tenxe"
          placeholder="Product Name"
          value={form.Tenxe}
          onChange={handleChange}
          required
        />

        {/* Brand */}
        <select
          name="Brand_id"
          value={form.Brand_id}
          onChange={handleChange}
          required
        >
          <option value="">--Choose a brand--</option>
          {brands.map((b) => {
            const id = b.Brand_id ?? b.id;
            const name = b.Tenthuonghieu ?? b.name;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>

        {/* Loại xe */}
        <select
          name="Loaixe_id"
          value={form.Loaixe_id}
          onChange={handleChange}
          required
        >
          <option value="">--Select vehicle type--</option>
          {loaixes.map((l) => {
            const id = l.Loaixe_id ?? l.id;
            const name = l.Tenloaixe ?? l.name;
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>

        <input
          type="number"
          name="Giaban"
          placeholder="Price"
          value={form.Giaban}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Soluong"
          placeholder="Amount"
          value={form.Soluong}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="hinhanh"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
