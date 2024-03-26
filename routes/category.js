var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
/* GET home page. */
router.get('/:slug', async function(req, res, next) {
  try {
    const slug = req.params.slug;
    const slugName = await Category.findOne({slug: slug})
    res.render('user/category', { title: slugName.name, slugName, js: 'category' });
  } catch (error) {
    res.status(500).send(error)
  }
});

module.exports = router;
