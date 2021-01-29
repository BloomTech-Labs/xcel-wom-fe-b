const initialState = {
    workorders: [],
    workorder: null,
    loading: true,
    error: {}
};

const workOrdersReducer = (state = initialState, action) => {
    switch (action.payload) {
        case 'GET_WORKORDERS':
            return { ...state, workorders: payload, loading: false};
        case 'GET_WORKORDER':
            return {...state, workorders: payload, loading: false};
        case 'SUBMIT_WO':
            return [...state, action.payload]
        case 'MARK_URGENT':
            return [...state.map(wo => wo.id === action.payload ? {...wo, urgent: !wo.urgent } : wo)];
        case 'MARK_NORMAL':
            return [...state.map(wo => wo.id === action.payload ? {...wo, urgent: wo.urgent } : wo)];
    }
}