const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    points: {type: Number, default: 0},
    role: {type: String, default: 'user'},
    refreshToken: {type: String, required: false, default: null},
    token_reset_password: {type: String, required: false, default: null}
})


module.exports = mongoose.model('Users', User);