const initialState = {
    name: '',
    phone: '',
    uid: '',
    picture: '',
    confirmation: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USER':
            return {name: action.name};
        case 'UPDATE_UID':
            return Object.assign({}, state, {
                uid: action.uid
            });
        case 'UPDATE_PHONE':
            console.log(action.phone);
            return Object.assign({}, state, {
                phone: action.phone
            });
        case 'UPDATE_PICTURE':
            console.log(action.picture);
            return Object.assign({}, state, {
                picture: action.picture
            });
        default:
            return state;

    }
};
