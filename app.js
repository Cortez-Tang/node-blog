/**
 * @Author: tangzhicheng
 * @Date: 2020-11-07 20:32:38
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-09 22:54:13
 * @Description: file content
 */
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const fs = require('fs');
const path = require('path');


const userRouter = require('./src/routes/user');
const blogRouter = require('./src/routes/blog');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
} else {
  const filename = path.join(__dirname, 'logs', 'access.log');
  const accessWriteStream = fs.createWriteStream(filename, {
    flags: 'a'
  });
  app.use(logger('combined', {
    stream: accessWriteStream
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 产生一个会话id存在cookie中并为之创建对应的session对象
const RedisStore = require('connect-redis')(session);
const { redisClient } = require('./src/db/redis');
const e = require('express');
const sessionStore = new RedisStore({
  client: redisClient
});
app.use(session({
  secret: 'swqe24sd$',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 24 * 3600 * 1000
  },
  store: sessionStore
}));

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

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

const test = '';

module.exports = app;
