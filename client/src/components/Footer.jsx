import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
     <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
        {/* Branding */}
        <div className="mb-4 md:mb-0">
          <span className="font-semibold text-lg">🏨 Guest House Admin</span>
          <p className="text-gray-400 text-xs">Efficient management for your guest house.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/admin/guesthouses" className="hover:text-gray-300">Guest Houses</Link>
          <Link to="/admin/bookings" className="hover:text-gray-300">Bookings</Link>
        </div>
      </div>

      <div className="bg-gray-900 text-center py-2 text-gray-400 text-xs">
        © {new Date().getFullYear()} Guest House Admin. All rights reserved.
      </div>
    </footer>
  )
}
