import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Top Header */}
      <header className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center">
        <div className="text-xl font-bold">🏨 Guest House Admin</div>
        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:inline">Hello, Admin</span>
          <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
            Logout
          </button>
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
        <div className={`flex-col sm:flex-row sm:flex gap-6 text-sm font-medium ${isOpen ? 'flex' : 'hidden'} sm:flex`}>
          <Link to="/" className="hover:text-blue-600 py-1">Home</Link>
          <Link to="/admin/dashboard" className="hover:text-blue-600 py-1">Dashboard</Link>
          <Link to="/admin/guesthouses" className="hover:text-blue-600 py-1">Guest Houses</Link>
          <Link to="/admin/check-availability" className="hover:text-blue-600 py-1">Availability</Link>
        </div>
      </nav>
    </div>
  );
}
