const express = require('express');
const passport = require('passport');
const router = express.Router();



router.get('/', (req, res, next) => {
    res.send({success: true, message: "Welcome"});
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
);

/**Here we pass d request from google after a user authorizes our app, back to Passport google strategy so that
 * it can read d user code in the callback URL & use that to return a profile to us from Google
 */
router.get('/google/callback', passport.authenticate('google'));

module.exports = router;