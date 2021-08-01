const express = require('express');
const mongoose = require('mongoose');
if(process.env.NODE_ENV !== "production") require('dotenv').config({path: './.env'});
require('./services/passport'); //Not exporting/returning anything from our passport config, so no need to assign it to a variable

const authRoutes = require('./routes/auth');

const app = express();


app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true, useUnisfiedTopology: true, useCreateIndex: true, useFindAndModify: false
        // });
        // console.log('GoodleLearn connected to MongoDB');
        app.listen(PORT, () => console.log('GoodleSurvey server is running on Port ', PORT ));
        
        
    } catch (err) {
        console.error(err);
    }
};
start();