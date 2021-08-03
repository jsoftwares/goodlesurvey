const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireAuth = require('../middlewares/requireAuth');

module.exports = app => {
    
    app.post('/api/v1/stripe_charge', requireAuth, async (req, res) => {
        
        const {id, client_ip, email, card:{name, }} = req.body;
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: `Payment for survey units from ${email} on IP ${client_ip}`,
            source: id
        });
        
        // Passport deserialize method adds re.user model to d req object on successful login of a user
        req.user.credits += 5;
        const user = await req.user.save();
        res.send(user);
    });
};