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
