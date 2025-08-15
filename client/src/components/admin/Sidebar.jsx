import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { FiLogOut } from "react-icons/fi";
import ChangePassword from "../../pages/client/auth/ChangePassword";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <aside className={styles.sidebar}>
      <h2>🚴‍♂️BlueSolis</h2>

      <nav className={styles.mainMenu}>
        <NavLink
          to="/admin/dashboard"
          end
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          🏠 Dashboard
        </NavLink>
        <NavLink
          to="/admin/products"
          end
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          🛒 Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          end
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          🧾 Orders
        </NavLink>
        <NavLink
          to="/admin/customers"
          end
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          👥 Customers
        </NavLink>
        <NavLink
          to="/admin/statistics"
          end
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          📊 Statistics
        </NavLink>
      </nav>

      <div className={styles.bottomMenu}>
        <button
          className={styles.logoutBtn}
          onClick={() => {
            setOpen(false);
            setShowChangePassword(true);
          }}
          type="button"
        >
          🔐 Change Password
        </button>

        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
          type="button"
        >
          🚪 Logout
          <FiLogOut className={styles.logoutBtn__icon} />
        </button>
      </div>

      {showChangePassword && (
        <div className="popup-overlay">
          <div className="popup-container">
            <ChangePassword onClose={() => setShowChangePassword(false)} />
            <button
              className="close-btn"
              onClick={() => setShowChangePassword(false)}
            ></button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
