import React, { useEffect, useState, useRef } from "react";
import styles from "./Orders.module.scss";
import apiRoutes from "@api";
import { formatDateVN } from "@utils/formatDate";
import anime from "animejs";
import SplitType from "split-type";

const statusColorMap = {
  Paid: "paid",
  Cancelled: "cancelled",
  Delivering: "delivering",
  Delivered: "delivered",
};

const Orders = ({ onCompletedUpdate }) => {
  const [orders, setOrders] = useState([]);
  const titleRef = useRef(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const fetchPendingOrders = () => {
    const token = localStorage.getItem("token");
    fetch(`${apiRoutes.base}/admin/orders/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(setOrders)
      .catch((err) => console.error("Lỗi lấy đơn hàng:", err));
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

  useEffect(() => {
    fetchPendingOrders();
  }, []);
  const handleSearch = (e) => setSearchKeyword(e.target.value.toLowerCase());
  const handleStatusChange = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(
        `${apiRoutes.base}/admin/orders/update-status/${orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }

      await res.json();

      if (status === "Delivered" || status === "Cancelled") {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
      } else {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status } : o))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const filteredOrders = orders.filter((order) =>
    `${order.id}${order.name || ""}${order.status}`
      .toLowerCase()
      .includes(searchKeyword)
  );

  return (
    <div className={styles.orders}>
      <div className={styles["topbar"]}>
        <input
          type="text"
          placeholder="Search..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
          className={styles["topbar-search"]}
        />
      </div>

      <h2 ref={titleRef} className={`text-xl ${styles.title}`}>
        Pending orders
      </h2>

      <table className={styles.table}>
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
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.total.toLocaleString()}đ</td>
              <td>{formatDateVN(order.time)}</td>
              <td>
                <select
                  className={`${styles["orders__status"]} ${
                    styles[`orders__status--${statusColorMap[order.status]}`]
                  }`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="Paid">Paid</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Delivering">Delivering</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
