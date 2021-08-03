const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./services/passport'); //Not exporting/returning anything from our passport config, so no need to assign it to a variable
const keys = require('./config/keys');

const authRoutes = require('./routes/auth');

const app = express();

// MIDDLEWARES: to modify incoming req b4 they're sent off to route handlers
app.use(express.json());
// Cookie
/**cookie-session allows us specify multiple keys in d array & when we do, it will pick one randamly to use when
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
require('./routes/billing')(app);   //alternative way of setting up route. billing.js exports a fn that takes app

if (process.env.NODE_ENV === 'production') {
    /**Express serves up production assets like our main.js file if it doesn't recognize the route:
     * Express checks if there are specific files that matches what d incoming request is looking for, if
     * there is, it will answer d req with d static line below & if it does not, control moves to d get route
     * handle below.
     */
    app.use(express.static('client/build'));

    /**Express serves up the index.js file if it doesn't recognize the route: if Express don't find a static file
     *  in public that matches d req, it will return the index.html page. More like a catch all
     */
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


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