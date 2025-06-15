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

// ✅ Only available guest houses

module.exports = router;
