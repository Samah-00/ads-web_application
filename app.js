// ------- Require Section -------
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session');
const crypto = require("crypto");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adsRouter = require('./routes/ads');
const { sequelize } = require('./db');  // Import sequelize from db.js

const app = express();

// ------- view engine setup -------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ------- middlewares -------
// generate a secretive key for the session
const secret = crypto.randomBytes(64).toString('hex');
// Use the session middleware
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
}));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
        extended: true
    })
)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ads', adsRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//     if (err.status === 404) {
//         res.status(404);
//         res.render('errorPage',{ Title: 'Error'});
//     } else {
//         next(err);
//     }
// });

// to make sure that we listen on an available port
const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () => {
    console.log(`Ready to receive requests on port ${port}.`);
});

module.exports = app;
