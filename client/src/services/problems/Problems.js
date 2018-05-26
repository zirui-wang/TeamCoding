import axios from 'axios';

export const fetchProblem = async id => {
  const res = await axios.get('/api/v1/problems/' + id);
  return res.data;
};