const { connectDB } = require('./config/db.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.js')
const router = express.Router();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Start Server
const app = express();
app.use(express.json());  // Defines request body
app.use(cookieParser());
app.use(cors());

// Register Router
app.use('/api/auth', authRoutes);

// Connect to Database
connectDB();
app.listen(5000, () => console.log('Server running at port 5000'));



module.exports = router;