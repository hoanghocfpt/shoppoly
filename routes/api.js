var multer = require('multer');
var express = require('express');
var router = express.Router();
var otp = require('otp-generator');
var nodemailer = require('nodemailer');
var dotenv = require('dotenv');
dotenv.config();
var OtpContronller = require('../controller/OtpController');
var UserController = require('../controller/UserController');
var authenticateToken = require('../middleware/authenticateToken');

var { auth, refreshToken, logout, getUsers, getUser, postUser, deleteUser, patchUser, changePassword } = require('../controller/UserController');
var { getCategories, getCategorySlug, getCategoryId, postCategory, putCategory, patchCategory, deleteCategory } = require('../controller/CategoryController');
var { getProducts, getProductSlug, getProductId, getProductsByCategorySlug , postProduct, patchProduct, deleteProduct} = require('../controller/ProductController');
router.get('/', function(req, res) {
    res.send('API is working properly');
});

// GET: Danh mục
router.get('/categories', getCategories);

// GET: danh mục slug
router.get('/categories/slug=:slug', getCategorySlug);
router.get('/categories/s/:slug', getCategorySlug);

// GET: danh muc id
router.get('/categories/:id', getCategoryId);

// POST: tạo danh mục
router.post('/categories',authenticateToken, postCategory);

// PUT: cập nhật danh mục
router.put('/categories/:id', authenticateToken, putCategory);
router.patch('/categories/:id', authenticateToken, patchCategory);

// DELETE: xóa danh mục
router.delete('/categories/:id', authenticateToken, deleteCategory);
 
// GET: all sản phẩm
router.get('/products', getProducts);

// GET: sản phẩm
router.get('/products/:id', getProductId);
router.get('/products/s/:slug', getProductSlug);

// GET: sản phẩm theo danh mục
router.get('/products/category/:slug', getProductsByCategorySlug);

// PATCH: cập nhật sản phẩm
router.patch('/products/:id', authenticateToken, patchProduct);

// POST: tạo sản phẩm
router.post('/products',authenticateToken, postProduct);

// DELETE: xóa sản phẩm
router.delete('/products/:id', authenticateToken, deleteProduct);



// API for User

// GET all users
router.get('/users', getUsers);

// GET user by id
router.get('/users/:id', authenticateToken, getUser);

// POST create user
router.post('/users', postUser);

// DELETE user by id
router.delete('/users/:id', deleteUser);

// Refesh token
router.post('/refresh-token', refreshToken)
// POST login
router.post('/auth', auth)
// POST logout
router.post('/logout', logout)
// PATCH update user by id
router.patch('/users/:id', authenticateToken, patchUser);

// PATCH update user by id
router.patch('/users/change-password/:id',authenticateToken, changePassword);


// OTP
router.post('/forgot-password', async function(req, res, next) {
    try {
        const email = req.body.email;
        // kiem tra email co ton tai khong
        const user = await UserController.getOneByEmail(email);
        if(!user){
            res.status(401).send({message: 'Email not found'});
            return false;
        }
        const otpCode = otp.generate(6, { lowerCaseAlphabets: false ,upperCaseAlphabets: false, specialChars: false });
        const otpSend = await OtpContronller.create({email: email, otp: otpCode});
        console.log(otpSend);
        otpSend ? res.status(200).send({message: 'OTP sent successfully',email:email}) : res.status(500).send({message: 'OTP sent failed'});
        const info = await transporter.sendMail({
            from: '"Phạm Văn Hoàng" <iloveanh18@gmail.com>', // sender address
            to: "phamvanhoang182004@gmail.com", 
            subject: `Mã xác thực OTP của bạn là: ${otpCode}`,
            html: `<?xml version="1.0"?>
            <tbody><tr><td align="left" style="font-size:0px;padding:0px;padding-bottom:32px;word-break:break-word"><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table"><tbody><tr>
                  
                </tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:0px;padding-bottom:20px;word-break:break-word"><div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:28px;font-weight:700;line-height:1.6;text-align:left;color:#131517">${otpCode}</div></td></tr><tr><td align="left" style="font-size:0px;padding:0px;word-break:break-word"><div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517">là mã xác thực SHOP POLY của bạn.</div></td></tr><tr><td align="left" style="font-size:0px;padding:0px;padding-top:24px;word-break:break-word"><div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:14px;line-height:1.6;text-align:left;color:#737577"><div>Nếu bạn không có hành động trên, bạn có thể bỏ qua email này.</div><div style="padding-top:8px">Bạn cũng có thể <a class="m_-7417250413634874521cta-link" href="https://lu.ma/reset-password?key=5ahhaz384s9pawwf2ckb" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/reset-password?key%3D5ahhaz384s9pawwf2ckb&source=gmail&ust=1711681214048000&usg=AOvVaw2rK78qgaq6uNFIO0btI7iV">cài mật khẩu</a> để đăng nhập vào tài khoản của bạn.</div></div></td></tr><tr><td align="center" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word"><p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
                </p></td></tr></tbody>
            `,
        });
    
    } catch (error) {
        console.log(error);
    }
})


// Verify OTP code and success change password
router.post('/verify-otp', async function(req, res, next) {
    try {
        const email = req.body.email;
        const otpCode = req.body.otp;
        const otpData = await OtpContronller.getOneEmail(email);
        console.log(otpData.otp,otpCode);
        if(otpData && otpData.otp == otpCode){
            res.status(200).send({message: 'OTP is correct' ,status: 200});
        }else{
            res.status(401).send({message: 'OTP is incorrect', status: 401});
        }
    } catch (error) {
        res.status(403).send({message: 'OTP is expired', status: 403});
    }
})

// access reset password
router.post('/reset-password', async (req,res) => {
    try {
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        console.log(email,newPassword);
        const user = await UserController.updatePasswordByEmail(email, newPassword);
        res.status(200).send({message: 'Đổi mật khẩu thành công', user: user});
    } catch (error) {
        res.status(500).send({error})
    }
})

// config nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "iloveanh18@gmail.com",
      pass: "rdwt busr rgvg dqgs",
    },
});





// Cấu hình storage cho ảnh sản phẩm
const productStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/products/'); // Thư mục lưu trữ ảnh sản phẩm
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên file
    }
});

// Cấu hình storage cho ảnh danh mục
const categoryStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/categories/'); // Thư mục lưu trữ ảnh danh mục
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Đặt tên file
    }
});

// Tạo instances của multer với các cấu hình storage khác nhau
const uploadProduct = multer({ storage: productStorage });
const uploadCategory = multer({ storage: categoryStorage });

// Route để tải lên ảnh sản phẩm
router.post('/products/images', uploadProduct.array('files', 10), function (req, res, next) {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Vui lòng cung cấp files để upload.' });
    }
    // Trả về thông tin của các file đã tải lên
    res.json(req.files);
});

// Route để tải lên ảnh danh mục
router.post('/categories/images', uploadCategory.single('file'), function (req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: 'Vui lòng cung cấp file để upload.' });
    }
    res.json({ path: req.file.path });
});



module.exports = router;
