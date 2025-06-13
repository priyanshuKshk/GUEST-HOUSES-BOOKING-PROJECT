// pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">🏨 Guest House Admin Panel</h1>
      <p className="text-gray-600 mb-8 text-sm md:text-base">
        Manage guest houses, bookings, and availability in one place.
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/admin/dashboard" className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded shadow">
          Go to Dashboard
        </Link>
        <Link to="/guesthouses" className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded shadow">
          Manage Guest Houses
        </Link>
        <Link to="/admin/check-availability" className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-2 rounded shadow">
          Check Availability
        </Link>
      </div>
    </div>
  );
}
