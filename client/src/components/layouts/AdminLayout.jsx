import React from "react";

import styles from "./AdminLayout.module.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
