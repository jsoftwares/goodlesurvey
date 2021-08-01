const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

/**accessToken is used to access parts of d user's account like Google Drive, Emails, Calendar etc. We 
 * send that to Google to say this is d token for this user that proves we have d those information from
 * their account
 * refreshToken allow us refresh/update d accToken which expires after some amount of time
  */
//  Configure passport
 passport.use(new GoogleStrategy(
    {
        clientID: keys.googleOAuthClientID,
        clientSecret: keys.googleOAuthClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
    })

);