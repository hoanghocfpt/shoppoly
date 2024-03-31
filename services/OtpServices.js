const Otp = require('../models/Otp')
// get otp by email
exports.getOneEmail = async (email) => {
    console.log(email);
    return await Otp.findOne({email})
}
// create otp
exports.create = async (data) => {
    return await Otp.create(data)
}