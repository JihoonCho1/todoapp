const { connectDB } = require('./config/db.js');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Start Server
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Temporary Memory (Will be saved to DB)
const users = [];


// Connect to Database
connectDB();

// Register User
app.post('/register', async (req, res) => {
    console.log("Request Received", req.body);
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = { username, password: hashedPassword };

        users.push(user);

        console.log("Saved User:", user);
        res.status(201).send("Registered Successfully");
    } catch (e) {
        console.log("Error:", e);
        res.status(500).send("Server Error");
    }
})


app.listen(5000, () => console.log('Server running at port 5000'));
