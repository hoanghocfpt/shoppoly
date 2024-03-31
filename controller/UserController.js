var UserServices = require('../services/UserServices');
var bcrypt  =  require('bcryptjs');
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

exports.updatePassword = async (id, oldPassword,password) => {
    const userData = await UserServices.getOne(id);
    if(userData && bcrypt.compareSync(oldPassword, userData.password) === false){
        return {error: 'Mật khẩu cũ không đúng'};
    }
    return await UserServices.updatePassword(id, password);
}

exports.delete = async (id) => {
    return await UserServices.delete(id);
}

