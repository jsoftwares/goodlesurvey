const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

/**sendgrid mail is a helper that takes a lot of configuration properties & spit outs a Mailer which we use to 
 * pipe our email content to Sendgrid for dispatch
 */

class Mailer extends helper.Mail {
    constructor({subject, recipients}, htmlContent){
        super();    //ensure any constructor defined inside d email class gets called here

        this.sgApi = sendgrid(keys.sendgridKey);    //returns an object we can use to communicate with sendgrid API
        this.from_email = new helper.Email('sales@ibegadget.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', htmlContent);
        this.recipients = this.formatAddresses(recipients);

        /**Mail class we extend has a addContent() to which we're expected to pass in our actual content. We've
         * also formated our content using sendgrid mail helper. This step adds our content as d content of d
         * email
          */
        this.addContent(this.body);

        this.addClickTracking();
        this.addRecipients();
    }

    formatAddresses(recipients) {
        /**you need to have parenthesis to do destructuring with an arrow function. recipients is an
         * array of objects with email key {email: 'some@abstract.com'}. So for each element we destruture
         * out d email
         */
        return recipients.map( ({email}) => {
            return new helper.Email(email);
        });
    }


    addClickTracking() {
        const trackSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackSettings);
    }

    // Helper to takes our already helper.Email() formated list & registers it with d actual email
    addRecipients(){
        const personalize = new helper.Personalization();

        this.recipients.forEach( recipient => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);   //method inherited from helper.Mail base class
    }

    async send() {
        try {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });
            const response = await this.sgApi.API(request);
            console.log(response);
            return response;
            
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Mailer;