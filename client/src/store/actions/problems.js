import { FETCH_PROBLEMS, FETCH_PROBLEM } from './actionTypes';
import axios from 'axios';

export const fetchProblems = () => async dispatch => {
  const res = await axios.get('/api/v1/problems');
  dispatch ({ type: FETCH_PROBLEMS, payload: res.data });
};

export const fetchProblem = id => async dispatch => {
  const res = await axios.get('/api/v1/problems/' + id);
  dispatch ({ type: FETCH_PROBLEM, payload: res.data });
};

export const submitProblem = problem => async dispatch => {
  await axios.post('/api/v1/problems', problem);
  const resProblems = await axios.get('/api/v1/problems');
  dispatch({ type: FETCH_PROBLEMS, payload: resProblems.data });
}
