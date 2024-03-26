var express = require('express');
var router = express.Router();

function handleLogin(req, res) {
  res.render('user/login', { title: 'Đăng nhập', js: 'login'});
}

/* GET login page. */
router.get('/', handleLogin );
router.get('/dang-nhap', handleLogin);

/* GET register page. */
router.get('/dang-ky', function(req, res) {
  res.render('user/signup', { title: 'Đăng ký', js: 'signup' });
});


module.exports = router;
