import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as reduxForm }  from "redux-form";

/** redux-form comes with its own formReducer that we have to hookup to our store, this is how reduxForm is able
 * to get a handle of sort on our redux store.
**/

export default combineReducers({
    auth: authReducer,
    form: reduxForm
});