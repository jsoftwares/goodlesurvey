const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    })
);

/**Here we pass d request from google after a user authorizes our app, back to Passport google strategy so that
 * it can read d user code in the callback URL & use that to return a profile to us from Google, then d next cb
 * middleware which redirects d request to '/home'
 */
router.get(
    '/auth/google/callback', 
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/home');
    }
);

router.get('/api/v1/current-user', (req, res) => {
    res.send(req.user);
});

// Passport adds logout() & some other function as property to d req object
router.get('/api/v1/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;