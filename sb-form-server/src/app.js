const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const formsRouter = require('./routes/forms');
const formTemplatesRouter = require('./routes/templates');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(logger(process.env.LOG_FORMAT || 'dev'));

app.use(express.json({ limit: '70mb' }));
app.use((error, req, res, next) => {
  if (error.name === 'PayloadTooLargeError') {
    res.status(400).send('Your attached Images are too large.');
  } else {
    next(error);
  }
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/forms', formsRouter);
app.use('/templates', formTemplatesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
