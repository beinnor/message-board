require('dotenv').config();
const createError = require('http-errors'); // https://www.npmjs.com/package/http-errors
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); // https://www.npmjs.com/package/cookie-parser
const logger = require('morgan'); // https://www.npmjs.com/package/morgan

const indexRouter = require('./routes/index');
const messagesRouter = require('./routes/messages');

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
const dbConn = mongoose.connection;
dbConn.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
