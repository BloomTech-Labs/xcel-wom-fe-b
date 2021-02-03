import axios from 'axios';
import { getAuthHeader } from '../../api/index';
// import { useOktaAuth } from '@okta/okta-react';

export const GET_WORKORDERS_START = 'GET_WORKORDERS_START';
export const GET_WORKORDERS_SUCCESS = 'GET_WORKORDERS_SUCCESS';
export const GET_WORKORDERS_FAIL = 'GET_WORKORDERS_FAIL';

export const getWorkOrders = (companyId, authState) => (dispatch) => {
    dispatch({ type: GET_WORKORDERS_START })
    console.log(companyId);
     //Okta auth
    // const { authState } = useOktaAuth();
    const headers = getAuthHeader(authState);
    return axios
        .get(`https://xcel-wom-api-b.herokuapp.com/company/${companyId}/orders`, {headers})
        .then((response) => {
            console.log( "response", response.data);
            dispatch({
                type: GET_WORKORDERS_SUCCESS,
                payload: response.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_WORKORDERS_FAIL,
                payload: "error loading workorders" + err,
            });
        });
}

