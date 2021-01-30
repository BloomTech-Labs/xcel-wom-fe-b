import axios from 'axios';
import { getAuthHeader } from '../../api/index';

export const GET_WORKORDERS = 'GET_WORKORDERS';
export const GET_WORKORDER = 'GET_WORKORDER';
export const SUBMIT_WORKORDER = 'SUBMIT_WORKORDER';
export const MARK_URGENT = 'MARK_URGENT';
export const MARK_NORMAL = 'MARK_NORMAL';
export const RENDER_SOMETHING = 'RENDER_SOMETHING';

export const renderSomething = (companyId, authState) => (dispatch) => {
    console.log(companyId);
    const headers = getAuthHeader(authState);
    return axios
        .get(`https://xcel-wom-api-b.herokuapp.com/company/${companyId}/orders`, {headers})
        .then(response => {
            console.log( "response");
            dispatch({
                type: RENDER_SOMETHING,
                payload: response.data
            })
        })
        .catch((err) => console.error(err.message));
}

