const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const requireCredit = require('../middlewares/requireCredit');
const Survey = require('../models/Survey');

const router = express.Router();

router.post('/api/v1/surveys', requireAuth, requireCredit, async (req, res)=>{

    const { title, subject, body, recipients } = req.body;
    const survey = await Survey.create({
        title,
        subject,
        body,
        recipient: recipients.split(',').map(email => ({email})),
        /**recipients is entered as strings separated with coma, so we split d string at each comma to get an
         * array of string which we then use map to loop through to return an array of objects. Each object is
         * for each email & contains {email: abc@example.com}. We place d return object in a ({email}) so that 
         * d JS compiler is not confused if {} wraps a block of code for a function or we are returning an obj
         */
        user: req.user.id
    });
});
