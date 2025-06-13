// models/GuestHouse.js
const mongoose = require('mongoose');

const guestHouseSchema = new mongoose.Schema({
  name: String,
  location: String,
  rooms: Number,
  bookedRooms:  Number
  
});

module.exports = mongoose.model('GuestHouse', guestHouseSchema);
