var multer = require('multer');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
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
        if(id === req.user.id){
        const user = await UserController.getOne(id);
        res.json(user);
        }else{
            res.status(401).send({message: 'You are not authorized to delete this user'});
        }
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

// Authencation user
// POST login
router.post('/auth', async function(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const data = await UserController.getOneByEmail(email);
        if(data && data.password === password && data.email === email){
            const accessToken = jwt.sign({id: data._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
            res.status(200).send({accessToken});
        } else {
            res.status(401).send({message: 'User not found'});
        }
        
    } catch (error) {
        res.status(500).send(error);
    }
})


router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Bạn đã truy cập thành công nội dung được bảo vệ', user: req.user})
})

module.exports = router;
