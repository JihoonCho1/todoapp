const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },   
}, {timestamps: true});

// Login
userSchema.methods.matchPassword = async function(enteredPassword) { 
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema); 

module.exports = User;