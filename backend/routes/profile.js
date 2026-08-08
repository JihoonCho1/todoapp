// Upload profile picture
const express = require('express');
const User = require('../models/User.js');
const protect = require('../middleware/auth.js').protect;
const router = express.Router();

const multer = require('multer');
const path = require('path');

// Storage for user profile images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/profile/");
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// // Update profile picture
// router.put("/image", protect, upload.single("profileImage"), async(req, res) => {
//         try {
//             const user = await User.findById(req.user._id);
//             user.profileImage = `/uploads/profile/${req.file.filename}`;

//             await user.save();

//             res.json({
//                 message: "Profile image updated",
//                 profileImage: user.profileImage
//             });

//         } catch (err) {
//             res.status(500).json({message: err.message});
//         }
//     }
// )

//Update User Status
router.put("/status", protect, async(req, res) => {
    console.log("STATUS ROUTE HIT");

    res.json({ message: "Status route works" });
})

module.exports = router;