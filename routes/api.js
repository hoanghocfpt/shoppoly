var multer = require('multer');
var express = require('express');
var router = express.Router();
var otp = require('otp-generator');
var bcrypt = require('bcryptjs')
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
var OtpContronller = require('../controller/OtpController');
var CategoryController = require('../controller/CategoryController');
var ProductController = require('../controller/ProductController');
var UserController = require('../controller/UserController');
var authenticateToken = require('../middleware/authenticateToken');



dotenv.config();
router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

// GET: Danh mục
router.get('/categories', async function(req, res, next) {
   try {
     const categories = await CategoryController.getAll()
     res.json(categories);
    } catch (error) {
     res.status(500).send(error);
    }
});
// GET: danh mục slug
router.get('/categories/slug=:slug', async function(req, res, next) {
    try {
        const slug = req.params.slug;
      const category = await CategoryController.getOneBySlug(slug);
      res.json(category);
     } catch (error) {
      res.status(500).send(error);
     }
});

// GET: danh muc id
router.get('/categories/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id);
      const category = await CategoryController.getOne(id);
      res.json(category);
     } catch (error) {
      res.status(500).send(error);
     }
});
// POST: tạo danh mục
router.post('/categories', async function(req, res, next) {
    try {
        const category = await CategoryController.create(req.body);
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT: cập nhật danh mục
router.put('/categories/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id, req.body);
        const category = await CategoryController.update(id,req.body, 'PUT');
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.patch('/categories/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id, req.body);
        const category = await CategoryController.update(id,req.body, 'PATCH');
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/categories/s/:slug', async function(req, res, next) {
    try {
        const slug = req.params.slug;
        const category = await CategoryController.getOneBySlug(slug);
        res.json(category);
    }
    catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/categories/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const category = await CategoryController.delete(id);
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
});
 
// Sản phẩm
router.get('/products', async function(req, res, next) {
    try {
        const products = await ProductController.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Sản phẩm
router.get('/products/s/:slug', async function(req, res, next) {
    try {
        const slug = req.params.slug;
        const products = await ProductController.getOneBySlug(slug);
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Sản phẩm
router.get('/products/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id);
        const products = await ProductController.getOne(id);
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get san pham theo danh muc
router.get('/products/category/:slug', async function(req, res, next) {
    try {
        const slug = req.params.slug;
        console.log(slug)
        const products = await ProductController.getAllBySlugCategory(slug);
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/products/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id, req.body);
        const category = await ProductController.update(id,req.body, 'PATCH');
        res.json(category);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/products', async function(req, res, next) {
    try {
        const product = await ProductController.create(req.body)
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/products/:id', async function(req,res){
    try {
        const id = req.params.id
        const product = await ProductController.delete(id)
        return product
    } catch (error) {
        res.status(500).send(error)
    }
})



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





// API for User

// GET all users
router.get('/users', async function(req, res, next) {
    try {
        const users = await UserController.getAll();
        res.json(users);
    } catch (error) {
        res.status(500 ).send(error)
    }
});

// GET user by id
router.get('/users/:id', authenticateToken, async function(req, res, next) {
    try {
        const id = req.params.id;
        console.log(id);
        // if(id === req.user.id){
        const user = await UserController.getOne(id);
        res.json(user);
        // }else{
        //     res.status(401).send({message: 'Unauthorized'});
        // }
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST create user
router.post('/users', async function(req, res, next) {
    try {
        
        const user = await UserController.create(req.body);
        res.json(user);
        console.log(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE user by id
router.delete('/users/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const user = await UserController.delete(id);
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Refesh token
router.post('/refresh-token', authenticateToken, async function(req, res) {
    try {
        const user = await UserController.getOne(req.user.id);
        const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
        const userData = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        }
        res.status(200).send({accessToken: accessToken, user: userData});
    } catch (error) {
        res.status(500).send(error);
    }
})


// Authencation user
// POST login
router.post('/auth', async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await UserController.getOneByEmail(email);
        if(data && bcrypt.compareSync(password, data.password) === true){
            const accessToken = jwt.sign({id: data._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
            const refreshToken = jwt.sign({id: data._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1y'});
            const userData = {
                id: data._id,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role
            }
            res.status(200).send({accessToken, refreshToken, user: userData});
        } else {
            res.status(401).send({message: 'User not found'});
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
})

// PATCH update user by id
router.patch('/users/:id', authenticateToken, async function(req, res, next) {
    try {
        const id = req.params.id;
        const data = req.body
        console.log(id, data);
        const user = await UserController.update(id, data, 'PATCH');
        res.json(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PATCH update user by id
router.patch('/users/change-password/:id',authenticateToken, async function(req, res, next) {
    try {
        const id = req.params.id;
        const {oldPassword, newPassword} = req.body
            const user = await UserController.updatePassword(id,oldPassword, newPassword);
            res.json(user)
    } catch (error) {
        res.status(500).send({error: error});
    }
});





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
        // const info = await transporter.sendMail({
        //     from: '"Phạm Văn Hoàng" <iloveanh18@gmail.com>', // sender address
        //     to: "phamvanhoang182004@gmail.com", 
        //     subject: `Mã xác thực OTP của bạn là: ${otpCode}`,
        //     html: `<?xml version="1.0"?>
        //     <tbody><tr><td align="left" style="font-size:0px;padding:0px;padding-bottom:32px;word-break:break-word"><table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table"><tbody><tr>
                  
        //         </tr></tbody></table></td></tr><tr><td align="left" style="font-size:0px;padding:0px;padding-bottom:20px;word-break:break-word"><div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:28px;font-weight:700;line-height:1.6;text-align:left;color:#131517">${otpCode}</div></td></tr><tr><td align="left" style="font-size:0px;padding:0px;word-break:break-word"><div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:16px;line-height:1.6;text-align:left;color:#131517">là mã xác thực SHOP POLY của bạn.</div></td></tr><tr><td align="left" style="font-size:0px;padding:0px;padding-top:24px;word-break:break-word"><div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif;font-size:14px;line-height:1.6;text-align:left;color:#737577"><div>Nếu bạn không có hành động trên, bạn có thể bỏ qua email này.</div><div style="padding-top:8px">Bạn cũng có thể <a class="m_-7417250413634874521cta-link" href="https://lu.ma/reset-password?key=5ahhaz384s9pawwf2ckb" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://lu.ma/reset-password?key%3D5ahhaz384s9pawwf2ckb&source=gmail&ust=1711681214048000&usg=AOvVaw2rK78qgaq6uNFIO0btI7iV">cài mật khẩu</a> để đăng nhập vào tài khoản của bạn.</div></div></td></tr><tr><td align="center" style="font-size:0px;padding:0px;padding-top:32px;word-break:break-word"><p style="border-top:solid 1px #ebeced;font-size:1px;margin:0px auto;width:100%">
        //         </p></td></tr></tbody>
        //     `,
        // });
    
        // console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.log(error);
    }
})


// Verify OTP code and success change password
router.post('/verify-otp', async function(req, res, next) {
    try {
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        const otpCode = req.body.otp;
        console.log(email, otpCode);
        const otpData = await OtpContronller.getOneEmail(email);
        console.log(otpData);
        if(otpData.otp === otpCode){
            const user = await UserController.updateByEmail(email, {password: newPassword});
            res.status(200).send({message: 'OTP is correct', user: user});
        }else{
            res.status(401).send({message: 'OTP is incorrect'});
        }
    } catch (error) {
        res.status(403).send({message: 'OTP is expired'});
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

module.exports = router;
