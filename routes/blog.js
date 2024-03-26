var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
/* GET users listing. */
router.get('/', function(req, res, next) {
  Post.find({}).then(posts => {
    res.render('blog',{title: 'Blog', posts});
  })
});



router.post('/add', function(req, res, next) {
  var title = req.body.title;
  var content = req.body.content;
  // var newPost = new Post({title,content});
  document.querySelector('#addPost').addEventListener('submit', function(e){
    e.preventDefault();
    console.log(title,content);
  })
  // newPost.save().then(() => {
  //   res.redirect('/blog');
  // });
});

router.get('/add', function(req, res, next) {
  res.render('add',{title: 'Add post'});
  
}
);

 
router.get('/:slug', function(req, res, next) {
  const title = req.params.slug;
  res.render('blog',{title})
});
module.exports = router;
