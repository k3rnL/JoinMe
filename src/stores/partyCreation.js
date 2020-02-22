const initialState = {
    name: '',
    location: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_NAME':
            return { name: state.name };
        case 'SET_NAME':
            return Object.assign({}, state, {
            name: action.name
        });
        case 'SET_LOCATION':
            return Object.assign({}, state, {
                location: action.location
            });
        default:
            return state;

    }
};
