const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const mongoose = require('mongoose');

const User = mongoose.model('users');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: 'superdupersecret'
}

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
  User.findOne({ _id: payload.sub }).then(user => {

    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }
    return done(null, user)
  }).catch(() => {
    return done(null, false, );
  })
}));


passport.use(new LocalStrategy({usernameField: 'username'}, (username, password, done) => {

  User.findUserByCredentials(username, password).then(user => {
     
    done(null, user);
  }).catch((err) => {
    
    done(err, false, );
  })
}));