const { connectDB } = require('./config/db.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.js')
const router = express.Router();
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// Start Server
const app = express();
app.use(express.json());  // Defines request body
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with frontend URL
    credentials: true // Allow cookies to be sent
}));

// Register Router
app.use('/api/auth', authRoutes);

// Profile update
const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

app.use("/uploads", express.static("uploads"));

// Connect to Database
connectDB();
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));


