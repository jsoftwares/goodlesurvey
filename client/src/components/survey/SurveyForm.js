// SurveyForm Shows a form for a user to add input 

import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {

    renderFields(){
        return _.map(formFields, ({label, name}) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name}  />;
        });
    }

    render() {
        return(
            <React.Fragment>
                <form onSubmit={this.props.handleSubmit( this.props.onSurveySubmit )}>
                    {this.renderFields()}

                    <Link to="/home" className="red btn-flat white-text">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                    <button className="teal btn-flat white-text right">
                        Next
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

// values is an object containing all d different values inputed by users in our form.
/**We return an object to tell reduxForm if d form is valid or not. If d object is empty, reduxForm assumes
 * d form is valid & allows it tibe submitted, else, it will not allow it. When we return d object, reduxForm
 * looks at d properties in it & if any matches up with any of d fields we are trying to render in our form,
 * then reduxForm will automatically take d error we set & pass it as a prop to our custom Field component where
 * we can access it from d meta props.
 */
function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    // check if field is empty
    _.each(formFields, ({name}) => {
        if (!values[name]) {
            errors[name] = `Please enter ${name}`;
        }
    })
    // if (!values.title) {
    //     errors.title = 'Please enter a title';
    // }

    return errors;
}


export default reduxForm({
    validate,
    destroyOnUnmount: false,
    form: 'surveyForm'
})(SurveyForm);