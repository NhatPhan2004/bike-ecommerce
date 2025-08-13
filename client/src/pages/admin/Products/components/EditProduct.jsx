import React, { useState, useEffect } from "react";
import axios from "axios";
import apiRoutes from "@api";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Products.module.scss";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Tenxe: "",
    Brand_id: "",
    Loaixe_id: "",
    Giaban: "",
    Soluong: "",
  });
  const [brands, setBrands] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [oldImage, setOldImage] = useState("");

  useEffect(() => {
    // Fetch product data
    axios
      .get(apiRoutes.base + apiRoutes.products.getById(id))
      .then((res) => {
        const data = res.data;
        setForm({
          Tenxe: data.Tenxe || "",
          Brand_id: data.Brand_id || "",
          Loaixe_id: data.Loaixe_id || "",
          Giaban: data.Giaban || "",
          Soluong: data.Soluong || "",
        });
        setOldImage(data.hinhanh || "");
      })
      .catch((err) => console.error("Error fetching product:", err));

    // Fetch brands
    axios
      .get(apiRoutes.base + apiRoutes.products.brands)
      .then((res) => setBrands(res.data))
      .catch((err) => console.error("Error fetching brands:", err));

    // Fetch vehicle types
    axios
      .get(apiRoutes.base + apiRoutes.products.loaixes)
      .then((res) => setVehicleTypes(res.data))
      .catch((err) => console.error("Error fetching vehicle types:", err));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setNewImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (newImage) formData.append("hinhanh", newImage);

    try {
      await axios.put(
        apiRoutes.base + apiRoutes.products.update(id),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Error updating product");
    }
  };

  return (
    <div className={styles.mainContent}>
      <form onSubmit={handleSubmit} className={styles.productEditForm}>
        <h2 className={styles.formTitle}>Edit Product</h2>
        <div className={styles.productId}>Product ID: {id}</div>

        <input
          type="text"
          name="Tenxe"
          placeholder="Product Name"
          value={form.Tenxe}
          onChange={handleChange}
          required
          className={styles.inputField}
        />

        <select
          name="Brand_id"
          value={form.Brand_id}
          onChange={handleChange}
          required
          className={styles.selectField}
        >
          <option value="">--Choose a brand--</option>
          {brands.map((b) => (
            <option key={b.Brand_id ?? b.id} value={b.Brand_id ?? b.id}>
              {b.Tenthuonghieu ?? b.name}
            </option>
          ))}
        </select>

        <select
          name="Loaixe_id"
          value={form.Loaixe_id}
          onChange={handleChange}
          required
          className={styles.selectField}
        >
          <option value="">--Select vehicle type--</option>
          {vehicleTypes.map((v) => (
            <option key={v.Loaixe_id ?? v.id} value={v.Loaixe_id ?? v.id}>
              {v.Tenloaixe ?? v.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="Giaban"
          placeholder="Price"
          value={form.Giaban}
          onChange={handleChange}
          required
          className={styles.inputField}
        />

        <input
          type="number"
          name="Soluong"
          placeholder="Quantity"
          value={form.Soluong}
          onChange={handleChange}
          required
          className={styles.inputField}
        />

        {oldImage && (
          <div className={styles.currentImage}>
            <label>Current Image:</label>
            <img
              src={`${apiRoutes.imageBase}${apiRoutes.image.product}${oldImage}`}
              alt="Current"
              className={styles.imagePreview}
            />
          </div>
        )}

        <div className={styles.fileInput}>
          <label>Upload New Image (optional):</label>
          <input
            type="file"
            name="hinhanh"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
