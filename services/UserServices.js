var User = require('../models/User');

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
    return await User.create(data);
}

exports.update = async (id, data, method) => {
    if (method === 'PUT') {
        return await User.findByIdAndUpdate(id, data, {new: true});
    }
    return await User.findByIdAndUpdate (id, data, {new: true});
}

exports.delete = async (id) => {
    return await User.findByIdAndDelete(id);
}
