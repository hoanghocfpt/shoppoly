var createError = require('http-errors');
var express = require('express');
var hbs = require('hbs');
 
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./models/connect'); // Add this line

db.connect()

// routes
// trang admin
var adminRouter = require('./routes/admin');
// trang chủ
var indexRouter = require('./routes/index');
// trang search
var searchRouter = require('./routes/search');
// trang login và register
var loginRouter = require('./routes/auth');
// trang user
var userRouter = require('./routes/user');
// trang blog
var blogRouter = require('./routes/blog'); // Add this line
// trang danh mục
var categoryRouter = require('./routes/category'); // Add this line
// trang sản phẩm
var productRouter = require('./routes/product'); // Add this line
// trang APIs
var apiRouter = require('./routes/api');
var app = express();


// dirname + views/partials
hbs.registerPartials(__dirname + '/views/partials');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.use('/', indexRouter);
app.use('/category', categoryRouter); // Add this line
app.use('/product', productRouter); // Add this line
app.use('/auth', loginRouter);
app.use('/search', searchRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter); // Add this line
app.use('/api', apiRouter);
app.use('/admin', adminRouter); // Add this line  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
