import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiLogIn, FiMenu, FiUserPlus, FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../assets/image.png";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";
export default function Header() {
  const { isLoggedIn, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout(); // calls the logout method from useAuth
    }
  };

  return (
    <div>
      {/* Top Header */}
      <header className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center">
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link to={"/"}>
            <img
              src={logo}
              alt="guest-house-logo"
              className="w-10 h-10 "
              style={{
                maxWidth: "250px",
                maxHeight: "50px",
                padding: "4px",
                marginRight: "10px",
                marginBottom: "2px",
              }}
            />
          </Link>
          <Link
            to="/home"
            className=" font-bold playfair-display"
            id="myElement"
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.8rem",
            }}
          >
            Guest Houses
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:inline">Hello, Admin</span>
        </div>
      </header>

      {/* Sub Header */}
      <nav className="bg-gray-100 text-gray-700 px-6 shadow-sm">
        {/* Hamburger + Desktop Nav */}
        <div className="flex items-center justify-between py-2 sm:hidden">
          <motion.button onClick={toggleMenu} whileTap={{ scale: 0.95 }}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-col sm:flex-row sm:flex gap-6 text-sm font-medium ${
            isOpen ? "flex" : "hidden"
          } sm:flex`}
        >
          <Link to="/" className="hover:text-blue-600 py-1">
            Home
          </Link>
          <Link to="/admin/dashboard" className="hover:text-blue-600 py-1">
            Dashboard
          </Link>
          <Link to="/guesthouses" className="hover:text-blue-600 py-1">
            Guest Houses
          </Link>
          <Link
            to="/admin/check-availability"
            className="hover:text-blue-600 py-1"
          >
            Availability
          </Link>

          <nav className=" md:flex space-x-6 text-gray-700 font-medium">
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="flex items-center space-x-1 hover:text-blue-600 py-1"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <FiLogIn />
                <span
                  className="ml-1"
                  style={{ paddingLeft: "5px" }}
                  id="myElement"
                >
                  Login
                </span>
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </nav>

      {/* Mobile Menu Button */}
    </div>
  );
}
