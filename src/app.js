const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});

const app = express();

const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        // await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true, useUnisfiedTopology: true, useCreateIndex: true, useFindAndModify: false
        // });
        // console.log('GoodleLearn connected to MongoDB');
        app.listen(PORT, () => console.log('GoodleLearn server is running on Port ', PORT ));
        
        
    } catch (err) {
        console.error(err);
    }
};
start();