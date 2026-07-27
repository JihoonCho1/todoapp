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
        const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '1h' });

        

        res.status(201).json({id: user._id, username: user.username, email: user.email, token: access_token});

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

        // Create access token and refresh token
        const access_token = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        const refresh_token = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '30d' });

        user.refreshToken = refresh_token;
        await user.save();
 
        // set HttpOnly cookie for refresh token
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict', // prevent CSRF attacks
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({ id: user._id, username: user.username, email: user.email, token: access_token });
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
})

// Me - Use this route to get access to the currently logged in user's info.
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
})

// Refresh Token
router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token is missing' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const user = await User.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }
        console.log("Refreshing Access Token");

        // Update to new access token
        const newAccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        

        res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(403).json({ message: 'Invalid Refresh Token' });
    }
})

const setRefreshTokenCookie = (res, token) => {
    res.cookie('refresh-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict', // prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })
}

// Logout
router.post('/logout', async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    // Remove Refresh Token from DB
    if (refreshToken) {
        await User.findOneAndUpdate({ refreshToken }, { refreshToken : null});
    }

    res.clearCookie('refresh-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
})

module.exports = router;