import axios from 'axios';

// 
export const GET_WORKORDERS = 'GET_WORKORDERS';
export const GET_WORKORDER = 'GET_WORKORDER';
export const SUBMIT_WORKORDER = 'SUBMIT_WORKORDER';
export const MARK_URGENT = 'MARK_URGENT';
export const MARK_NORMAL = 'MARK_NORMAL';

const getWorkOrders = () => async dispatch => {
    try {
        const res = await axios.get(`https://xcel-wom-api-b.herokuapp.com/company/${companyId}/orders`);
            dispatch({
                type: GET_WORKORDERS,
                payload: res.companyId,
    }) 
} catch (err) {
    dispatch({
      type: WO_ERROR,
      payload: err,
    });
  }

const geWorkOrder = () => async dispatch => {
    try  {
        const res = await axios.get(`https://xcel-wom-api-b.herokuapp.com/company/${companyId}/orders/${workOrderId}`);

    dispatch({
        type: GET_WORKORDER,
        payload: res.comanyId.workOrderId
    })
} catch (err) {
    dispatch({
      type: WO_ERROR,
      payload: err,
    });
  }

