const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const protect = require('../middleware/auth.js').protect;
const jwt = require('jsonwebtoken');

// Creating new mini express app just for routers
const router = express.Router();

// Register User
router.post('/register', async (req, res) => { 
    const {username, email, password} = req.body;

    try {
        // If user didn't fill in all fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }
        
        // Find if user already exists
        const userExists = await User.findOne({email});

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }

        // Create new user
        const user = await User.create({ username, email, password });

        // Create Token
        const token = generateToken(user._id);

        res.status(201).json({id: user._id, username: user.username, email: user.email, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
});

// Login User
router.post('/login', async (req, res) => { 
    const { email, password } = req.body;
    try {
        // If user didn't fill in all fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const user = await User.findOne({ email });

        if (!user || ! (await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.status(200).json({ id: user._id, username: user.username, email: user.email, token});
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
})

// Me - Use this route to get access to the currently logged in user's info.
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
})

// Generate JWT Token (Token expires in 30 Days)
const generateToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET || process.env.ACCESS_SECRET || 'dev-secret';
    return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
}



module.exports = router;