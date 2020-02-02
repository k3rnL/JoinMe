const initialState = {
    name: '',
    uid: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return { name: action.name };
        case 'UPDATE_UID':
            return Object.assign({}, state, {
            uid: action.uid
        });
        default:
            return state;

    }
};
