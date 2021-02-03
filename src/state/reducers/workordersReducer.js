import { 
    GET_WORKORDERS_START, 
    GET_WORKORDERS_SUCCESS, 
    GET_WORKORDERS_FAIL,
} from "../actions/workorders.actions";

const initialState = {
    workorders: [
        {
            workorder: {}
        },
    ],
};

const workordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WORKORDERS_START:
            return { 
                ...state, 
                isLoading: true, 
            };
        case GET_WORKORDERS_SUCCESS:
            return {
                ...state, 
                workorders: action.payload, 
                isLoading: false,
            };
        case GET_WORKORDERS_FAIL:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default workordersReducer;

// case SUBMIT_WORKORDER:
//     return [...state, action.payload]
// case MARK_COMPLETE:
//     return [...state.map(wo => wo.id === action.payload ? {...wo, urgent: !wo.urgent } : wo)];
// case STATUS:
//     return [...state.map(wo => wo.id === action.payload ? {...wo, urgent: wo.urgent } : wo)];