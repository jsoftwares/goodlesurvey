const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = require('../models/User');



/**serializeUser takes a fn which take d user model in an authentication flow & then generate some unique piece 
 * of identify information from it & Passport will stuff that into a cookie.
 * 1st argument is a user model we want passport to create a cookie for using d ID
*/
passport.serializeUser( (user, done) => {
    done(null, user.id);
});

/** DeserializeUser take d unique piece of identifier stored inside the cookie & turn it back to d actual user 
 * model. 1st argument is d token/ID passport stuffs inside d cookie.
 * This passport deserialize process adds d user property to req object as REQ.USER. It also adds some fn like
 * logout()
*/
passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


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
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id});

        if (existingUser != null) done(null, existingUser);

        const user = await User.create({googleId: profile.id});
        done(null, user);
    })

);