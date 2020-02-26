const initialState = {
  party: null,
};

export default (state = initialState, action) => {
  if (action.type === 'SET_PARTY') {
    return { party: action.party };
  }
  return state;
};
