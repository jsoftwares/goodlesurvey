const express = require('express');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
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
        // @TODO make this a transaction
        await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();
        res.send(user); //sending back d updated user, we can use this in d react side of things to update d user/credit
    } catch (err) {
        res.status(422).send(err);  //422 unprocessable entity
    }
    
});

router.get('/api/v1/surveys/:surveyId/:choice', (req, res) => {
    res.status(200).send('Thanks you for sharing your feedback.');
});


router.post('/api/v1/surveys/webhooks', (req, res) => {
    /** create a matcher (parser Object) that contains a pattern of d diff variables we want to extract
     * from pathname. :surveyId tells d path-parser library that we want to extract surveyId from d URL 
     * pathname. If p.test(pathname) is not able to match surveyId & choice, it returns NULL **/
    const p = new Path('/api/v1/surveys/:surveyId/:choice');

    /** REFACTOR WITH LODASH CHAIN() FUNCTION 
    const events = _.map(req.body, ({email, url}) => {  //distructure url & email from event received from sendgrid
        // const pathname = new URL(url).pathname;   //extra path from URL
        const match = p.test(new URL(url).pathname);
        if (match) {
            return {...match, email}
        }
    });

    // lodash compact() loops & removes any undefined element from an array. After our map() ops above, events
     // that are not of type click would return undefined. Here it returns only event objects
    const compactEvent = _.compact(events);

    // lodash UniqBy() loops & removes any duplicate element from an array. We saying loop tru elements in
     // compactEvent, look at their email & surveyId properties, if you find any duplicate (same email & survey),
     // then remove duplicate
    const uniqueEvents = _.unionBy(compactEvent, 'email', 'surveyId');

    */
/** chain take an array we intend to perform various operation on, each operation returns d result of calling it
 * to d next method that chains on it. In d end, value returns the final result of all called operations.
 */
   const events = _.chain(req.body)
    .map( ({email, url}) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
            return {surveyId: match.surveyId, choice: match.choice, email}
        }
    })
    .compact()
    .uniqBy('email', 'surveyId')
    .each(( {surveyId, email, choice } ) => {
        // FIND SURVEY & RECIPIENT, THEN UPDATE
        /**The mongoose query below finds a survey with d specified surveyId, & look in its recipients sub-documents 
         * collection (which is an array of records) for a document that match d given 
         * criteria {email:email, respondent:false}
         * $inc means increment; a mongoose operator that allows us put in a slightly intelligent logic inside of a
         * query that we issue to our DB. It finds 'yes' or 'no' & increments it by one. YES/NO is determined by
         * [choice] (using key interpollation), which will translate to either 'yes' or 'no' accordingly. 
         * $SET: this take d Survey found by the parametes in the 1st object of our query, then looks at its 'recipients'
         * sub-documents collection which contains a bunch of records, & to make sure we update only d record we care 
         * about the '.$.' sign is used; it lines up with '$elemMatch: { email: email, responded: false }' from our 
         * query issued above which finds just d sub-document collection recipient that we actually care about. '$' is
         * replaced with d index of d sub-document which could be eg 500 in d array of recipients. So we saying go to d 
         * recipients sub-document collection, go to d appropriate recipient that was just found in d '$elemMatch' query,
         * look at d responded property & set it to TRUE rather than false like it was before.
         * Notice we are not awaiting 'updateOne' query which is asynchronous bcos we do not need to send any specific
         * response to sendgrid webhooks, hence we do not need to wait for d query to finish executing b4 moving to
         * next line of code. 
         */
        Survey.updateOne({
            _id: surveyId,
            recipients: {
                $elemMatch: { email: email, responded: false }
            }
        }, {
            $inc: { [choice]: 1},
            $set: { 'recipients.$.responded': true},
            lastResponded: new Date()
        }).exec();
    })
    .value();


    res.send({});
});

module.exports = router;
