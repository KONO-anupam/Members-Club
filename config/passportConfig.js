const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

function initialize() {

  const customFields = { usernameField: 'nameOrEmail' };
  passport.use(
    new LocalStrategy(customFields, async (nameOrEmail, password, done) => {
      try {
        // console.log(nameOrEmail, password);
        const  user = !nameOrEmail.includes('@') ?  await User.findByUsername(nameOrEmail) : await User.findByEmail(nameOrEmail);
        if (!user) {
          return done(null, false, { message: 'Incorrect username or email' });
        }
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: 'Incorrect password' });
        }

        if (user.deactivated) {
          return done(null, false, {message: 'Account deactivated. Please contact the admin to appeal.'})
        }
        
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = User.findById(id);
      // user = { id: 1, username: "klauspoppe", password: "monster" }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;