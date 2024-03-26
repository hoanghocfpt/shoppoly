var UserServices = require('../services/UserServices');

exports.getAll = async () => {
    return await UserServices.getAll();
}

exports.getOne = async (id) => {
    return await UserServices.getOne(id);
}

exports.getOneByEmail = async (email) => {
    return await UserServices.getOneByEmail(email);
}

exports.getOneByPhone = async (phone) => {
    return await UserServices.getOneByPhone(phone);
}

exports.create = async (data) => {
    return await UserServices.create(data);
}

exports.update = async (id, data, method) => {
    return await UserServices.update(id, data, method);
}

exports.delete = async (id) => {
    return await UserServices.delete(id);
}

