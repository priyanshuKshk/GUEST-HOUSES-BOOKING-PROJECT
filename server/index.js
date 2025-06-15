const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://guest-houses-booking-project.onrender.com'],
  credentials: true
}));
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

const guestHouseRoutes = require('./routes/guestHouseRoutes');
app.use('/api/guesthouses', guestHouseRoutes);
const adminRoutes = require('./routes/admin');

// …other middleware…
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
