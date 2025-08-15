import React, { useState, useEffect, useRef } from "react";
import styles from "./Dashboard.module.scss";
import apiRoutes from "@api";
import { formatDateVN } from "@utils/formatDate";
import axios from "axios";
import anime from "animejs";
import SplitType from "split-type";

const statusColorMap = {
  Paid: "paid",
  Cancelled: "cancelled",
  Delivering: "delivering",
  Delivered: "delivered",
};

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const titleRef = useRef(null);

  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0,
  });

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
      .get(`${apiRoutes.base}${apiRoutes.stats.main}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch stats:", err));

    axios
      .get(`${apiRoutes.base}${apiRoutes.stats.completedOrders}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch completed orders:", err));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    axios
      .put(
        `${apiRoutes.base}${apiRoutes.stats.updateStatus(id)}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
        );
      })
      .catch((err) => {
        console.error("Failed to update status:", err);
        alert("Update the failure status");
      });
  };

  return (
    <div className={styles.dashboard}>
      <main className={styles["dashboard__main"]}>
        <div className={styles["dashboard__topbar"]}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className={styles["dashboard__topbar-search"]}
          />
        </div>

        <section className={styles["dashboard__content"]}>
          <div className={styles["dashboard__cards"]}>
            <div
              className={`${styles["dashboard__card"]} ${styles["dashboard__card--blue"]}`}
            >
              🛒 <strong>{stats.products}</strong>
              <br />
              Products
            </div>
            <div
              className={`${styles["dashboard__card"]} ${styles["dashboard__card--green"]}`}
            >
              🧾 <strong>{stats.orders}</strong>
              <br />
              Orders
            </div>
            <div
              className={`${styles["dashboard__card"]} ${styles["dashboard__card--orange"]}`}
            >
              👥 <strong>{stats.users}</strong>
              <br />
              Customers
            </div>
            <div
              className={`${styles["dashboard__card"]} ${styles["dashboard__card--red"]}`}
            >
              💰 <strong>{Number(stats.revenue).toLocaleString()}đ</strong>
              <br />
              Revenue
            </div>
          </div>

          <div className="large centered row">
            <h2 ref={titleRef} className="text-xl">
              Completed Orders
            </h2>
          </div>

          <table className={styles["dashboard__table"]}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Total</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((order) => order.name.toLowerCase().includes(search))
                .map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{Number(order.total).toLocaleString()}đ</td>
                    <td>{formatDateVN(order.time)}</td>
                    <td>
                      {order.status === "Cancelled" ||
                      order.status === "Delivered" ? (
                        <span
                          className={
                            styles[
                              `dashboard__status--${
                                statusColorMap[order.status]
                              }`
                            ]
                          }
                        >
                          {order.status}
                        </span>
                      ) : (
                        <select
                          className={`${styles["dashboard__status"]} ${
                            styles[
                              `dashboard__status--${
                                statusColorMap[order.status]
                              }`
                            ]
                          }`}
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                        >
                          <option value="Paid">Paid</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Delivering">Delivering</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      )}
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

export default AdminDashboard;
