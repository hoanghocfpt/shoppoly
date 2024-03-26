const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    points: {type: Number, default: 0},
    role: {type: String, default: 'user'},
})


module.exports = mongoose.model('Users', User);