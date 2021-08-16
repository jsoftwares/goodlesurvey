const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const requireCredit = require('../middlewares/requireCredit');
const Survey = require('../models/Survey');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const router = express.Router();

router.post('/api/v1/surveys', requireAuth, requireCredit, async (req, res)=>{

    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({email}) ),
        /**recipients is entered as strings separated with coma, so we split d string at each comma to get an
         * array of string which we then use map to loop through to return an array of objects. Each object is
         * for each email & contains {email: abc@example.com}. We place d return object in a ({email}) so that 
         * d JS compiler is not confused if {} wraps a block of code for a function or we are returning an obj
         */
        _user: req.user.id,
        dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));
    
    try {
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user); //sending back d updated user, we can use this in d react side of things to update d user/credit
    } catch (err) {
        res.status(422).send(err);  //422 unprocessable entity
    }
    
});

router.get('/api/v1/surveys/thanks', (req, res) => {
    res.send('Thanks you for sharing your feedback.')
})

module.exports = router;
