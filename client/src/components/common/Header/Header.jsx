// ✅ FINAL FILE: Header.jsx
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logo1 from "../../../assets/images/logo1.png";
import LoginRegister from "../../../pages/client/auth/LoginRegister";
import "../../../style/layouts/header.scss";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleLogin = () => setShowLogin(!showLogin);
  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__row-flex">
          <div className="header__left">
            <NavLink to="/" className="header__logo">
              <img src={logo1} alt="logo" />
            </NavLink>
          </div>

          <div className="header__menu-icon" onClick={toggleMobileMenu}>
            <GiHamburgerMenu />
          </div>

          <div className="header__center">
            <ul
              className={`header__main-menu ${isMobileMenuOpen ? "open" : ""}`}
            >
              <li>
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    isActive ? "header__main-menu--active" : undefined
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "header__main-menu--active" : undefined
                  }
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/flashsale"
                  className={({ isActive }) =>
                    isActive ? "header__main-menu--active" : undefined
                  }
                >
                  Flash Sale
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "header__main-menu--active" : undefined
                  }
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="header__right">
            <div className={`header__search ${showSearch ? "active" : ""}`}>
              <input type="text" placeholder="Search..." />
              <IoSearchSharp onClick={toggleSearch} />
            </div>

            <NavLink to="/cart" className="header__cart">
              <FaShoppingCart />
              <span className="header__quantity-cart"></span>
            </NavLink>

            {/* ✅ Sửa tại đây - mở form đăng nhập khi nhấn icon user */}
            <div className="header__user" onClick={toggleLogin}>
              <AiOutlineUser />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Sửa tại đây - popup đăng nhập hiện ra */}
      {showLogin && (
        <div className="login-popup-center" onClick={() => setShowLogin(false)}>
          <div className="login-popup-box" onClick={(e) => e.stopPropagation()}>
            <LoginRegister />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
