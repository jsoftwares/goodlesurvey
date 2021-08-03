import { Component } from "react";
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        // debugger;
        //token option is a callback fn that gets called when we recieve an authorization token from stripe on after submitting d stripe form
        return (
            <StripeCheckout
                name="Goodle Survey"
                description="$5 for 5 Surveys"
                amount={500}
                token={ token => this.props.chargeUser(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">Add Credit</button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions)(Payments);