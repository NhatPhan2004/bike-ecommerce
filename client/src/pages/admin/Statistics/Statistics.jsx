import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import apiRoutes from "@api";
import styles from "./Statistics.module.scss";

const Statistics = () => {
  const [data, setData] = useState(null);
  const chartsRef = useRef({});

  const chartLoaiRef = useRef(null);
  const chartTenxeRef = useRef(null);
  const chartTrangthaiRef = useRef(null);
  const chartDoanhthuRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${apiRoutes.base}/admin/statistics`)
      .then((res) => {
        setData(res.data);
        renderCharts(res.data);
      })
      .catch((err) => console.error("Error fetching statistics:", err));

    return () => {
      Object.values(chartsRef.current).forEach((chart) => chart.destroy());
    };
  }, []);

  const renderCharts = (stats) => {
    Object.values(chartsRef.current).forEach((chart) => chart.destroy());

    chartsRef.current.chartLoai = new Chart(chartLoaiRef.current, {
      type: "bar",
      data: {
        labels: stats.loaiXe.map((i) => i.label),
        datasets: [
          {
            label: "Số lượng",
            data: stats.loaiXe.map((i) => i.value),
            backgroundColor: "#42A5F5",
          },
        ],
      },
    });

    chartsRef.current.chartTrangthai = new Chart(chartTrangthaiRef.current, {
      type: "pie",
      data: {
        labels: stats.trangThai.map((i) => i.label),
        datasets: [
          {
            data: stats.trangThai.map((i) => i.value),
            backgroundColor: ["#F44336", "#4CAF50"],
          },
        ],
      },
    });

    chartsRef.current.chartDoanhthu = new Chart(chartDoanhthuRef.current, {
      type: "line",
      data: {
        labels: stats.doanhThu.map((i) => i.label),
        datasets: [
          {
            label: "Doanh thu (VNĐ)",
            data: stats.doanhThu.map((i) => i.total),
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            ticks: {
              callback: (value) => value.toLocaleString("vi-VN") + "₫",
            },
          },
        },
      },
    });
  };

  return (
    <div className={styles.container}>
      <h1>📊 Statistics</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Statistics by purchase volume</h3>
          {/* <canvas ref={chartTenxeRef}></canvas>+{" "} */}
          <canvas ref={chartLoaiRef}></canvas>
        </div>

        <div className={styles.card}>
          <h3>Order Status</h3>
          <canvas ref={chartTrangthaiRef}></canvas>
        </div>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <h3>📈 Revenue by month</h3>
          <canvas ref={chartDoanhthuRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
