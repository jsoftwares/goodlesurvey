import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions  from '../../actions';

const SurveyFormReview = ({onCancel, formValues, sendSurvey, history}) => {

    const reviewFields = formFields.map( ({name, label}) => {
            return (
                <tr key={name}>
                    <td>{label}</td>
                    <td> { formValues[name] } </td>
                </tr>
            );
    });
    
    return (
        <div>
            <h5>Please confirm your entries</h5>
            <table className="striped">
                <thead>
                <tr>
                    <th>Items</th>
                    <th>Values</th>
                </tr>
                </thead>

                <tbody>
                    { reviewFields }
                </tbody>
            </table>

            <button onClick={ onCancel } className="yellow darken-3 btn-flat white-text">Back</button>
            <button onClick={ () => sendSurvey(formValues, history) } className="green white-text btn-flat right">
                Send Survey <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return { formValues: state.form.surveyForm.values }
};

/**We wrap component with withRouter() so that it has some react router properties, eg. history() passed into
 * it as props. */
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));