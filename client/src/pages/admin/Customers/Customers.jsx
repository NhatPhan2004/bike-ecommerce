import React, { useEffect, useState, useRef } from "react";
import styles from "./Customers.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import apiRoutes from "@api";
import anime from "animejs";
import SplitType from "split-type";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [search, setSearch] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${apiRoutes.base}/admin/customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = async (userId) => {
    if (
      window.confirm(`Are you sure you want to delete customers: ${userId}?`)
    ) {
      try {
        await axios.delete(`${apiRoutes.base}/admin/customers/${userId}`);
        setCustomers((prev) => prev.filter((c) => c.User_id !== userId));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

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

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((val) =>
      String(val).toLowerCase().includes(searchKeyword.toLowerCase())
    )
  );

  return (
    <div className={styles.customers}>
      <div className={styles["topbar"]}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          className={styles["topbar-search"]}
        />
      </div>

      <h2 ref={titleRef} className={`text-xl ${styles.title}`}>
        Customers
      </h2>

      <section className={styles.pageContent}>
        <table className={styles.customerTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.User_id}>
                <td>{c.User_id}</td>
                <td>{c.Hoten}</td>
                <td>{c.Email}</td>
                <td>{c.Diachi}</td>
                <td>{c.Sdt}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(c.User_id)}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Customers;
