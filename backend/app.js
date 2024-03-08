const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config()


const usersRouter = require('./routes/users');
const blogs = require('./routes/blogs');
const like = require('./routes/like');
const comment = require('./routes/comment');


const app = express();

// This is to link backend with frontend
app.use(cors(
  {
    credentials : true,
    origin : "http://localhost:3000",
  }
))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/blog', blogs);
app.use('/api/v1/user', usersRouter);
app.use('/api/v1/like', like);
app.use('/api/v1/comment', comment);

// error handler
app.use(function(err, req, res, next) {
  return res
  .status(err.status || 500)
  .json(err.status === 500 ? "Internal Sever Error" : err)
});

module.exports = app;
