const updateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SUBMIT_ORDER':
            return [...state, action];
        default:
            return state;
    }
}

export default updateReducer;