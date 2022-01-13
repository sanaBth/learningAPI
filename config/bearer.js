
const passport = require('passport');
const BearerStrategy = require ('passport-http-bearer');
const jwt = require("jsonwebtoken");
const User = require('../models/user');


passport.use(new BearerStrategy(
    async function(token, done) {
    const decode = await jwt.verify(token,process.env.TOKEN_KEY);
    User.findOne({ _id: decode.id }, 
      function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  }
  ));



  module.exports = passport;