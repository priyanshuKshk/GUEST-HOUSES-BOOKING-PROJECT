import React, { useEffect, useState } from 'react';
import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // dev: http://localhost:5000/api
});
export default function GuestHouseManager() {
  const [showAddForm, setShowAddForm] = useState(false); 
  const [guestHouses, setGuestHouses] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rooms: '',
    bookedRooms: ''
  });
  const [isEditing, setIsEditing] = useState(null); // moved outside loop in final version
  const [editData, setEditData] = useState({
    name: '',
    location: '',
    rooms: '',
    bookedRooms: '', 
  });
  const isNumeric = (v) => v !== '' && !isNaN(v);
  // Fetch guest houses
const fetchGuestHouses = async () => {
  try {
    const res = await api.get('/guesthouses');
    // If backend ever changes to plain array, this still works.
    const data = Array.isArray(res.data) ? res.data : res.data.guestHouses;
    setGuestHouses(data);
  } catch (err) {
    console.error('Error fetching guest houses', err);
    alert('❌ Failed to fetch guest houses. Please try again later.');
  }
};
  useEffect(() => {
    fetchGuestHouses();
  }, []);

  // Handle input change
  const handleChange = (e) => {
      const { name, value } = e.target;

  if (['rooms', 'bookedRooms'].includes(name)) {
    if (!/^\d*$/.test(value)) return; // allow only digits (empty or numbers)
  }
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    const rooms = Number(formData.rooms);
const booked = Number(formData.bookedRooms);
  e.preventDefault();
 if (
  !/^\d+$/.test(formData.rooms) ||
  !/^\d+$/.test(formData.bookedRooms)
) {
  alert('❌ Please enter only positive numbers in Rooms and Booked Rooms.');
  return;
}
if (!Number.isInteger(rooms) ||rooms <= 0) {
    alert('❌  Total rooms must be a positive integer (1 or more).');
    return;
  }
  if (!Number.isInteger(booked) || booked < 0) {
    alert('❌  Booked rooms must be 0 or a positive integer.');
    return;
  }
  if (Number(booked) > Number(rooms)) {
    alert('❌ Booked rooms cannot be more than total rooms.');
    return;
  }

  try {
    await api.post('/guesthouses', formData);
    setFormData({ name: '', location: '', rooms: '', bookedRooms: '' });
    setShowAddForm(false);     // close the panel after save
    fetchGuestHouses();
  } catch (err) {
    console.error('Error adding guest house', err);
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">Manage Guest Houses</h1>

      {/* Add Guest House Form */}
    <div className="max-w-xl mx-auto mb-10">

  {!showAddForm ? (
    /* BUTTON: visible by default */
    <button
      onClick={() => setShowAddForm(true)}
      className="w-full bg-blue-950 text-white py-3 rounded-lg shadow hover:bg-blue-900"
    >
      ➕ Add Guest House
    </button>
  ) : (
    /* FORM: appears only after button click */
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-6 border mt-4"
    >
      <h2 className="text-xl font-semibold mb-4">Add Guest House</h2>

      <input
        type="text"
        name="name"
        placeholder="Guest House Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="number"
        name="rooms"
          min="0"
        placeholder="Total Rooms"
        value={formData.rooms}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />
      <input
        type="number"
        name="bookedRooms"
          min="0"
        placeholder="Booked Rooms"
        value={formData.bookedRooms}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setShowAddForm(false);
            setFormData({ name: '', location: '', rooms: '', bookedRooms: 0 });
          }}
          className="text-red-600 hover:underline px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </form>
  )}

</div>

      {/* Guest House Cards */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
{guestHouses.map((gh) => {


  const startEditing = (gh) => {
    setIsEditing(gh._id);
    setEditData({
      name: gh.name,
      location: gh.location,
      rooms: gh.rooms,
        bookedRooms: gh.bookedRooms
    });
  };

  const handleEditChange = (e) => {
     if (['rooms', 'bookedRooms'].includes(name)) {
    if (!/^\d*$/.test(value)) return; // allow only digits
  }
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/guesthouses/${id}`, editData); // <-- adjust route if needed
      setIsEditing(null);
      fetchGuestHouses(); // refresh list
      if (
  !/^\d+$/.test(editData.rooms) ||
  !/^\d+$/.test(editData.bookedRooms)
) {
  alert('❌ Please enter only positive numbers in Rooms and Booked Rooms.');
  return;
}

    } catch (err) {
      console.error('Error updating guest house', err);
    }
  };
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("⚠️ Are you sure you want to delete this guest house?");
  if (!confirmDelete) return;

  try {
    await api.delete(`/guesthouses/${id}`);
    fetchGuestHouses(); // Refresh after deletion
  } catch (err) {
    console.error("Error deleting guest house", err);
    alert("❌ Failed to delete. Please try again.");
  }
};
  return (
    <div
      key={gh._id}
      className="relative bg-white p-6 rounded-2xl border shadow hover:shadow-lg transition-all"
    >
      {/* Status Badge */}
    <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
  gh.bookedRooms >= gh.rooms
    ? 'bg-red-100 text-red-700 border border-red-300'
    : 'bg-green-100 text-green-700 border border-green-300'
}`}>
  {gh.bookedRooms >= gh.rooms ? 'Fully Booked' : 'Available'}
</span>

      <h3 className="text-xl font-semibold text-blue-800 mb-2">{gh.name}</h3>
      <p className="text-gray-600 mb-1">📍 <span className="font-medium"><strong>LOCATION-</strong>{gh.location}</span></p>
    <p className="text-gray-600"><strong>🛏️ Total Rooms:</strong> {gh.rooms}</p>
<p className="text-gray-600"><strong>📦 Booked:</strong> {gh.bookedRooms}</p>
<p className="text-gray-600"><strong>✅ Available:</strong> {gh.rooms - gh.bookedRooms}</p>
<div className="flex gap-2 mt-4">
  <button
    className="bg-blue-950 text-white py-1 px-3 rounded hover:bg-blue-900"
    onClick={() => startEditing(gh)}
  >
    Edit
  </button>

  <button
    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
    onClick={() => handleDelete(gh._id)}
  >
    Delete
  </button>
</div>

      {isEditing === gh._id && (
        <div className="mt-4 space-y-2">
          <input
            name="name"
            value={editData.name}
            onChange={handleEditChange}
            placeholder="Name"
            className="w-full border p-2 rounded"
          />
          <input
            name="location"
            value={editData.location}
            onChange={handleEditChange}
            placeholder="Location"
            className="w-full border p-2 rounded"
          />
          <input
            name="rooms"
            type="number"
            value={editData.rooms}
            onChange={handleEditChange}
            placeholder="Rooms"
            className="w-full border p-2 rounded"
          />
          <input
  name="bookedRooms"
  type="number"
  value={editData.bookedRooms}
  onChange={handleEditChange}
  placeholder="Booked Rooms"
  className="w-full border p-2 rounded"
  required
/>
          <button
            onClick={() => handleUpdate(gh._id)}
            className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(null)}
            className="ml-2 text-sm text-red-600 hover:underline"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
})}

  
</div>

    </div>
  );
}
