const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./services/passport'); //Not exporting/returning anything from our passport config, so no need to assign it to a variable
const keys = require('./config/keys');

const authRoutes = require('./routes/auth');

const app = express();
// MIDDLEWARES: to modify incoming req b4 they're sent off to route handlers
// Cookie
/**cookie-session allows us specify multiple keys in d array & when we do, will pick on randamly to use when
 * different user makes http request. This is just an additional level of security
 */
app.use(
        cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,   //30days in milliseconds
        keys: [keys.cookieKey]
    })
);

// Initialize/tell passport to use cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false
        });
        console.log('GoodleLearn connected to MongoDB');
        app.listen(PORT, () => console.log('GoodleSurvey server is running on Port ', PORT ));
        
        
    } catch (err) {
        console.error(err);
    }
};
start();