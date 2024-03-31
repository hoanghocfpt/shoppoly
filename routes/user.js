var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('user/user', { title: 'User Page', js: 'user' });
});


// Doi mat khau page
router.get('/doi-mat-khau', function(req, res, next) {
  res.render('user/change-password', { title: 'Đổi mật khẩu', js: 'change-password' });
});
module.exports = router;
