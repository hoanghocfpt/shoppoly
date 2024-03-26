var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/:slug', function(req, res, next) {
  res.render('user/product', { title: 'Sản phẩm', js: 'product'});
});

module.exports = router;
