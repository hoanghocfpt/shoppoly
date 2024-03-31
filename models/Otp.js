const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Otp = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    created_at: { type: Date, default: Date.now, expires: 60000},
});

module.exports = mongoose.model('otps', Otp);