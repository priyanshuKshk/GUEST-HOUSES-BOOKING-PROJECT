// routes/admin.js
const express = require('express');
const router  = express.Router();
const GuestHouse = require('../models/GuestHouse');
// const Booking = require('../models/Booking'); // if you have a separate bookings collection

router.get('/summary', async (req, res) => {
  try {
    // Grab all guest houses
    const guestHouses = await GuestHouse.find();

    // ✨ Core stats
    const totalGuestHouses   = guestHouses.length;
    const totalRooms         = guestHouses.reduce((sum, gh) => sum + gh.rooms,        0);
    const totalBookedRooms   = guestHouses.reduce((sum, gh) => sum + gh.bookedRooms,  0);
    const totalAvailableRooms = totalRooms - totalBookedRooms;

    // If you track bookings in a separate collection, replace the next line:
    const totalBookings = totalBookedRooms;         // or: await Booking.countDocuments();

    res.json({
      totalGuestHouses,
      totalBookings,
      totalAvailableRooms,
    });
  } catch (err) {
    console.error('Admin summary error:', err);
    res.status(500).json({ error: 'Failed to fetch admin summary' });
  }
});
router.get('/recent-activity', async (req, res) => {
  try {
    const recentGuestHouses = await GuestHouse.find()
      .sort({ createdAt: -1 }) // Most recent first
      .limit(5); // Show last 5 entries

    res.status(200).json(recentGuestHouses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch recent activity' });
  }
});
router.get('/availability', async (req, res) => {
  try {
    const guestHouses = await GuestHouse.find({
      $expr: { $gt: ["$rooms", "$bookedRooms"] }
    });

    const data = guestHouses.map(gh => ({
      id: gh._id,
      name: gh.name,
      location: gh.location,
      totalRooms: gh.rooms,
      bookedRooms: gh.bookedRooms,
      availableRooms: gh.rooms - gh.bookedRooms,
    }));

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});


module.exports = router;
