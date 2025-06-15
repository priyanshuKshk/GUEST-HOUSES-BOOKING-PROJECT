// models/GuestHouse.js
const mongoose = require('mongoose');

const guestHouseSchema = new mongoose.Schema({
  name: String,
  location: String,
  rooms: Number,
  bookedRooms:  Number
  
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

module.exports = mongoose.model('GuestHouse', guestHouseSchema);
