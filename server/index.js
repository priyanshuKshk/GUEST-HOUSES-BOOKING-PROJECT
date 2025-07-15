const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://guest-houses-booking-project.vercel.app",
  "https://guest-houses-booking-project.onrender.com"
  
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


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
const signupLoginRoutes = require('./routes/auth');
app.use("/", signupLoginRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
