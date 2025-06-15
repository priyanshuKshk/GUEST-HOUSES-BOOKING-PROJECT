import React, { useEffect, useState } from 'react';
import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // dev: http://localhost:5000/api
});
export default function CheckAvailability() {
  const [guestHouses, setGuestHouses] = useState([]);

  useEffect(() => {
    api.get('/admin/availability')
      .then(res => setGuestHouses(res.data))
      .catch(err => console.error('Error fetching guest house availability:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Guest Houses</h1>

      {guestHouses.length === 0 ? (
        <p className="text-gray-500">No guest houses with available rooms found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {guestHouses.map(gh => (
            <div key={gh.id} className="bg-white p-4 rounded shadow border">
              <div  className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{gh.name}</h2>
                  <p className="text-sm text-gray-500">{gh.location}</p>
                </div>
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700">
                  Available
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Total Rooms: {gh.totalRooms} | Booked: {gh.bookedRooms} | Available: {gh.availableRooms}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
