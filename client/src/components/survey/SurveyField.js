
const SurveyField = ({input, label, meta:{touched, error}}) => {
    return (
        <div className="input-field">
            <label htmlFor={input.name} className="active">{label}</label>
            <input {...input} id={input.name} className="validate" />
            <span className="helper-text red-text" data-error="wrong">{touched && error}</span>
        </div>
    );
}; 

export default SurveyField;