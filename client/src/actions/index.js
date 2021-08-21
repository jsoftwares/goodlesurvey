import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
    const {data} = await axios.get('/api/v1/current-user');
    dispatch({ type: FETCH_USER, payload: data });
};

export const chargeUser = (token) => async dispatch => {
    const { data } = await axios.post('/api/v1/stripe_charge', token);
    dispatch({ type: FETCH_USER, payload: data });
};

export const sendSurvey = (formValues, history) => async dispatch => {
    const { data } = await axios.post('/api/v1/surveys', formValues);

    history.push('/home');
    //Once api call is success (survey is sent), we get back d updated user data which indicated d decrease in
    //credit, we then dispatch d FETCH_USER action so as to update our local state with this data 
    dispatch({ type: FETCH_USER, payload: data });
};
