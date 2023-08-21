const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../model/user.model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  try {
    const user = User.findById(id);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

const creds = {
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
};

const authHandler = async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
        password: 'initialPassword',
      });
      (await user).save();
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
};

passport.use(new GoogleStrategy(creds, authHandler));
