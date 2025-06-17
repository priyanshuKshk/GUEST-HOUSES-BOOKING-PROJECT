const express = require('express');
const router = express.Router();
const GuestHouse = require('../models/GuestHouse');

router.get('/', async (req, res) => {
  const guestHouses = await GuestHouse.find();
  res.json({ guestHouses });
});

router.post('/', async (req, res) => {
  const { name, location, rooms, bookedRooms} = req.body;
  const newGH = new GuestHouse({ name, location, rooms , bookedRooms });
  await newGH.save();
  res.status(201).json({ message: 'Guest house added' });
});
router.put('/:id', async (req, res) => {
  try {
    const updated = await GuestHouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update guest house' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GuestHouse.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Guest House not found' });
    }
    res.json({ message: 'Guest House deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// ✅ Only available guest houses
// routes/guesthouses.js
module.exports = router;
