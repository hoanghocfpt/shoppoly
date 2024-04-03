var UserServices = require('../services/UserServices');
var bcrypt  =  require('bcryptjs');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
dotenv.config();
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

exports.getUsers = async function(req, res) {
    try {
        const users = await UserServices.getAll();
        res.json(users);
    } catch (error) {
        res.status(500 ).send(error)
    }
}

exports.getUser = async function(req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await UserServices.getOne({ _id: id });
        res.status(200).send({status: 200, user: user});
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.logout = async (req, res) => {
    try {
        const id = req.body.id;
        console.log(id);
        await UserServices.update(id, {refreshToken: null});
        res.status(200).send({message: 'Đăng xuất thành công', status: 200});
    } catch (error) {
        res.status(500).send({message: 'Đã xảy ra lỗi khi xử lý:'+error, status: 500});
    }
}
exports.auth = async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await UserServices.getOneByEmail(email);
        if(data && bcrypt.compareSync(password, data.password) === true){
            const accessToken = jwt.sign({id: data._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'}); // 30 seconds
            const refreshToken = jwt.sign({id: data._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'}); // 1 year
            // Luu refresh token vao db
            const result = await UserServices.update(data._id, {refreshToken});
            const userData = {
                id: data._id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role
            }
       
            res.status(200).send({accessToken, refreshToken, user: userData, status: 200});
        } else {
            res.status(401).send({message: 'Mật khẩu sai', status: 401});
        }
        
    } catch (error) {
        res.status(500).send({message: 'Đã xảy ra lỗi khi xử lý', status: 500});
    }
}

exports.refreshToken = async function(req, res) {
    try {
        let token = req.body.refreshToken;
        const verify = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const id = verify.id;
        const user = await UserServices.getOne({ _id: id, refreshToken: token });
        if (!user) {
            return res.status(401).json({ message: 'Refresh token không hợp lệ', status: 401 });
        }
        const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'});
        const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y'});
        console.log(accessToken, refreshToken);
        // Xóa refresh token cũ và thay thế bằng refresh token mới
        await UserServices.update(id, { refreshToken });
        res.status(200).json({ accessToken, refreshToken, status: 200});
    } catch (error) {
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xử lý refresh token',status: 500 });
    }
}

exports.deleteUser = async function(req, res) {
    try {
        const id = req.params.id;
        const user = await UserServices.delete(id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.postUser = async function(req, res) {
    try { 
        const user = await UserServices.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.patchUser = async function(req, res) {
    try {
        const id = req.params.id;
        const data = req.body
        console.log(id, data);
        const user = await UserServices.update(id, data, 'PATCH');
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.changePassword = async function(req, res, next) {
    try {
        const id = req.params.id;
        const {oldPassword, newPassword} = req.body

        const userData = await UserServices.getOne(id);
        if(userData && bcrypt.compareSync(oldPassword, userData.password) === false){
            return {error: 'Mật khẩu cũ không đúng'};
        }
        const user = await UserServices.updatePassword(userData._id, newPassword);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send({error: error});
    }
}




exports.updatePasswordByEmail = async (email,password) => {
    const userData = await UserServices.getOneByEmail(email);
    return await UserServices.updatePassword(userData._id, password); 
}

exports.delete = async (id) => {
    return await UserServices.delete(id);
}

