const initialState = {
  name: '',
  location: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NAME':
      return { name: state.name };
    case 'SET_NAME':
      return { ...state, name: action.name };
    case 'SET_LOCATION':
      return { ...state, location: action.location };
    default:
      return state;
  }
};
