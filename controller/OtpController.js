const OtpServices = require('../services/OtpServices');
// get otp by email
exports.getOneEmail = async (email) => {
    return await OtpServices.getOneEmail(email);
}

// create otp
exports.create = async (data) => {
    return await OtpServices.create(data);
}