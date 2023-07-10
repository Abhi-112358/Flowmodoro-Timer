const User = require("../Models/User");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const axios = require('axios');

exports.signup_post = asyncHandler(async (req, res, next) => {
  console.log("meeee");
  try {
    const user = new User({
      email: req.body.email,
    });
    await user.save();

    res.json({ message: "User created successfully" });




  } catch (err) {
    return next(err);
  }
});

exports.login_post = asyncHandler(async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("ok");
      await axios.post('http://localhost:9000/auth/signup', {email: req.body.email});
      user = await User.findOne({ email: req.body.email });
      
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});


exports.signout_post = asyncHandler(async (req, res, next) => {
  
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    
    return res.json({ message: 'Signout successful'});
  });
});