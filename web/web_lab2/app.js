var express = require('express');
var app = express();
var path = require('path');


app.listen(3000, () => {
    console.log('server started')
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.set('views', path.join(__dirname, 'pugs'));  //инициализация папки для шаблонов паг
app.set('view engine', 'pug');                     //инициализация обработчика шаблонов


var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');

app.use(logger('dev'));
app.use(express.json());                                //обработка jsona
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());                                //обработка куки
app.use(fileUpload());                                  //загрузка файлов на сервер
app.use(express.static(path.join(__dirname, 'public'))); //чтобы экспресс искал нужные файлики в паблике
app.use(bodyParser.json());


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
