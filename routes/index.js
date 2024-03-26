var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.render('user/home', { title: 'Trang chủ', js: 'home'});

  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
