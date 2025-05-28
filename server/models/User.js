const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email: {type: String, unique: true},
    password: String,
    company: String,
    age : Number,
    dob: Date,
    image: { type: String },
    otp: {
        code : String,
        expiresAt: Date,
    },
});

module.exports = mongoose.model('User', userSchema);