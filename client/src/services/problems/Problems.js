import axios from 'axios';

export const fetchProblem = async id => {
  const res = await axios.get('/api/v1/problems/' + id);
  return res.data;
};

export const buildAndRun = async data => {
  const res = await axios.post('/api/v1/build_and_run', data);
  return res.data;
}