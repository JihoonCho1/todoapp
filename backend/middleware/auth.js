const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    console.log("🔥 PROTECT START");
    let token;

    // Authorisation: Bearer <token>

    // Check if token is valid request
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Get token from header
        

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

        // Access to all the properties of the user except password
        req.user = await User.findById(decoded.id).select("-password"); 

        return next();
        } catch (error) {
            console.error("Token verification failed", error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
};

module.exports = { protect };