var User = require('../models/User');
var bcrypt  =  require('bcryptjs');
exports.getAll = async () => {
    return await User.find();
}

exports.getOne = async (id) => {
    return await User.findById(id);
}

exports.getOneByEmail = async (email) => {
    return await User.findOne ({email: email});
}

exports.getOneByPhone = async (phone) => {
    return await User.findOne ({phone: phone});
}

exports.create = async (data) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    data.password = hash
    // Store hash in your password DB.
    return await User.create(data);
}

exports.update = async (id, data, method) => {
    if (method === 'PUT') {
        return await User.findByIdAndUpdate(id, data, {new: true});
    }
    return await User.findByIdAndUpdate(id, data, {new: true});
}

exports.updatePassword = async (id, password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return await User.findByIdAndUpdate(id, {password: hash}, {new: true});
}

exports.delete = async (id) => {
    return await User.findByIdAndDelete(id);
}
