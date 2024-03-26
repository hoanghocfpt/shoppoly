var express = require('express');
var router = express.Router();
// var Category = require('../models/Category');
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // const categories = await Category.find({});
    res.render('admin/layout', { title: 'Trang quản trị',isAdmin: true});

  } catch (error) {
    res.status(500).send(error);
  }
});



// get category page
router.get('/category/:id', async function(req, res, next) {
  try {
    res.render('admin/category-detail', { title: 'Quản lý danh mục', isAdmin: true, js: 'category'});

  } catch (error) {
    res.status(500).send(error);
  }
});

// get category page
router.get('/categories', async function(req, res, next) {
  try {
    res.render('admin/categories', { title: 'Trang quản trị',isAdmin: true, js: 'categories'});

  } catch (error) {
    res.status(500).send(error);
  }
});


router.get('/category-new', async function(req, res, next) {
  try {
    res.render('admin/category-new', { title: 'Thêm danh mục', isAdmin: true, js: 'category_new' });
  } catch (error) {
    res.status(500).send(error)
  }
});


router.get('/products', async function(req, res, next) {
  try {
    res.render('admin/products', { title: 'Quản lý sản phẩm', isAdmin: true, js: 'products' });
  } catch (error) {
    res.status(500).send(error);
  }
})


router.get('/products/:id', async function(req, res, next) {
  try {
    res.render('admin/product-detail', { title: 'Quản lý sản phẩm', isAdmin: true, js: 'product_detail' });
  } catch (error) {
    res.status(500).send(error);
  }
})

router.get('/product-new', async function(req, res, next) {
  try {
    res.render('admin/product-new', { title: 'Thêm sản phẩm', isAdmin: true, js: 'product_new' });
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = router;
