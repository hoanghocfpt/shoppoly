var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var q = req.query.q;
    var id = req.query.id;
    console.log(req);
    res.send(`Kết quả tìm kiếm của: ${q} (${id})`);
});

module.exports = router;
