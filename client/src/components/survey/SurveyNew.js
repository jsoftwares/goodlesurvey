// Shows SurveyNew and SurveyFormReview components

import React, {Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {

    state = { showRviewForm: false };
    renderContnet(){
        if (this.state.showRviewForm) {
            return <SurveyFormReview onCancel = { () => this.setState({ showRviewForm: false} )} />;
        }

        return  <SurveyForm onSurveySubmit = {() => this.setState( {showRviewForm:true} )} />;
    }

    render() {
        return(
            <div className="container">
               { this.renderContnet() }
            </div>
        );
    }
}

/**hooking up surveyForm here in the SurveyNew component ensures that when a user navigates away from the form
 * by pressing CANCEL or any other navigation except NEXT. Normally in SurveyForm, we use destroyOnUnmount: false
 * to ensure when user navigate away from SurveyForm we do not clear d form content held in form: 'surveyForm'
 * in redux store. Then we reference that say state in SurveyNew to but no destroyOnUnmount: false this time
 * hence when a user navigates away from SurveyNew we want to clear the form: 'surveyForm' state in Redux store
 */
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);