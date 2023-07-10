var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./Models/User');
var cors = require("cors");


var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var dataRouter = require('./routes/data');


var app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend domain
  credentials: true, // Allow cookies to be sent with cross-origin requests
}));

// Passport local strategy configuration

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    async (email, password, done) => {
      console.log('ok');
      try {

        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }
        console.log(user)
        return done(null, user);
      } catch (err) {
        console.log(err)
        return done(err);
      }
    })
);


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/data', dataRouter);

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
