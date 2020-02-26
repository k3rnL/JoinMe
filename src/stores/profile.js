const initialState = {
  firstname: '',
  lastname: '',
  phone: '',
  uid: '',
  picture: '',
  confirmation: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_UID':
      return {
        ...state,
        uid: action.uid,
      };
    case 'UPDATE_PHONE':
      return {
        ...state,
        phone: action.phone,
      };
    case 'UPDATE_PICTURE':
      return {
        ...state,
        picture: action.picture,
      };
    case 'UPDATE_NAMES':
      return {
        ...state,
        firstname: action.firstname,
        lastname: action.lastname,
      };
    default:
      return state;
  }
};
