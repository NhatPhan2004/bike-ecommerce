// src/components/Header/UserDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ChangePassword from "@pages/client/auth/ChangePassword";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (action) => {
    setOpen(false);
    if (action === "orders") navigate("/my-orders");
    if (action === "change-password") navigate("/change-password");
    if (action === "logout") logout();
  };

  return (
    <>
      <div className="user-dropdown" ref={dropdownRef}>
        <div className="user-dropdown__icon" onClick={() => setOpen(!open)}>
          <FaUserCircle />
        </div>

        {open && (
          <div className="user-dropdown__menu" role="menu" tabIndex={0}>
            <div
              className="user-dropdown__item"
              onClick={() => handleSelect("orders")}
              role="menuitem"
            >
              📦 My Orders
            </div>
            <div
              className="user-dropdown__item"
              onClick={() => {
                setOpen(false);
                setShowChangePassword(true);
              }}
              role="menuitem"
            >
              🔐 Change Password
            </div>

            <div
              className="user-dropdown__item user-dropdown__item--logout"
              onClick={() => handleSelect("logout")}
              role="menuitem"
            >
              🚪 Logout
              <FiLogOut className="user-dropdown__icon" />
            </div>
          </div>
        )}
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
    </>
  );
};

export default UserDropdown;
