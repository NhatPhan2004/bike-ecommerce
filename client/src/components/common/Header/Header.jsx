import React, { useState, useContext } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logo_header from "@assets/images/logo_header.png";
import LoginRegister from "@pages/client/auth/LoginRegister";
import "@style/layouts/header.scss";
import { useAuth } from "@contexts/AuthContext";
import { useCart } from "@contexts/CartContext";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useAuth();
  const { items } = useCart();
  const cartCount = user ? items.length : 0;

  const toggleLogin = () => setShowLogin(!showLogin);
  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleMenuItemClick = () => setIsMobileMenuOpen(false);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__row-flex">
          <div className="header__left">
            <NavLink to="/" className="header__logo">
              <img src={logo_header} alt="logo" />
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
                  onClick={handleMenuItemClick}
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
                  onClick={handleMenuItemClick}
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
                  onClick={handleMenuItemClick}
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
                  onClick={handleMenuItemClick}
                >
                  Shop
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="header__right">
            {/* Search */}
            <div className={`header__search ${showSearch ? "active" : ""}`}>
              <input type="text" placeholder="Search..." />
              <IoSearchSharp onClick={toggleSearch} />
            </div>

            {/* Cart */}
            <NavLink to="/cart" className="header__cart">
              <FaShoppingCart />
              <span className="header__quantity-cart">{cartCount}</span>
            </NavLink>
            <div className="header-cart"></div>

            {/* User */}
            {!user && (
              <div className="header__user" onClick={toggleLogin}>
                <AiOutlineUser />
              </div>
            )}
            {user && (
              <button className="header__logout" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Popup Login */}
      {showLogin && !user && (
        <div className="login-popup-center" onClick={() => setShowLogin(false)}>
          <div className="login-popup-box" onClick={(e) => e.stopPropagation()}>
            <LoginRegister onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
