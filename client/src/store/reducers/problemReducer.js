import { FETCH_PROBLEMS } from '../actions/actionTypes';

const initialState = {
  problems: []
};

const fetchUser = (state, action) => {
  return { ...state, problems: action.payload };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROBLEMS:
      return fetchUser(state, action);
    default:
      return state;
  }
};

export default reducer;
