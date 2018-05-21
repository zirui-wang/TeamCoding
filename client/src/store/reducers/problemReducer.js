import { FETCH_PROBLEMS, FETCH_PROBLEM } from '../actions/actionTypes';

const initialState = {
  problems: [],
  problem: null
};

const fetchProblems = (state, action) => {
  return { ...state, problems: action.payload };
};

const fetchProblem = (state, action) => {
  return { ...state, problem: action.payload };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROBLEMS:
      return fetchProblems(state, action);
    case FETCH_PROBLEM:
      return fetchProblem(state, action);
    default:
      return state;
  }
};

export default reducer;
