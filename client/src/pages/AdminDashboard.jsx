import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalGuestHouses: 0,
    totalBookings: 0,
    totalAvailableRooms: 0,
  });

  useEffect(() => {
    // Replace this with your actual backend API
    axios.get('/api/admin/summary').then(res => {
      setSummary(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-5 border">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Total Guest Houses</h2>
          <p className="text-3xl font-bold text-blue-600">{summary.totalGuestHouses}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Total Bookings</h2>
          <p className="text-3xl font-bold text-green-600">{summary.totalBookings}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border">
          <h2 className="text-sm font-medium text-gray-500 mb-1">Available Rooms</h2>
          <p className="text-3xl font-bold text-purple-600">{summary.totalAvailableRooms}</p>
        </div>
      </div>

      {/* Placeholder for future chart or booking details */}
      <div className="bg-white shadow rounded-lg p-6 border">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-500">Graph, bookings or logs can go here...</p>
      </div>
    </div>
  );
}
