import { RENDER_SOMETHING, GET_WORKORDERS, GET_WORKORDER, SUBMIT_WORKORDER, MARK_URGENT, MARK_NORMAL } from "../actions/allWo";

const initialState = {};

export const workOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case RENDER_SOMETHING:
            console.log("12:", action.payload)
            return {...state, workorders: action.payload};
        case GET_WORKORDERS:
            return { ...state, workorders: action.payload, loading: false};
        case GET_WORKORDER:
            return {...state, workorder: action.payload, loading: false};
        case SUBMIT_WORKORDER:
            return [...state, action.payload]
        case MARK_URGENT:
            return [...state.map(wo => wo.id === action.payload ? {...wo, urgent: !wo.urgent } : wo)];
        case MARK_NORMAL:
            return [...state.map(wo => wo.id === action.payload ? {...wo, urgent: wo.urgent } : wo)];
        default:
            return state;
    }
}