import React, { useEffect, useState } from 'react';
import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // dev: http://localhost:5000/api
});
export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalGuestHouses: 0,
    totalBookings: 0,
    totalAvailableRooms: 0,
  });
const [recentActivity, setRecentActivity] = useState([]);
  useEffect(() => {
    // Replace this with your actual backend API
    api.get('/api/admin/summary').then(res => {
      setSummary(res.data);
    });

api.get('/api/admin/recent-activity').then(res => setRecentActivity(res.data));
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

  {recentActivity.length === 0 ? (
    <p className="text-gray-500">No recent activity found.</p>
  ) : (
    <ul className="divide-y divide-gray-200">
      {recentActivity.map((item, index) => (
        <li key={index} className="py-2">
          <div className="font-medium text-gray-800">{item.name} ({item.location})</div>
          <div className="text-sm text-gray-600">
            Rooms: {item.totalRooms}, Booked: {item.bookedRooms}, Available: {item.totalRooms - item.bookedRooms}
          </div>
          <div className="text-xs text-gray-400">Added on: {new Date(item.createdAt).toLocaleString()}</div>
        </li>
      ))}
    </ul>
  )}
</div>


      </div>

  );
}
