import { FETCH_PROBLEMS } from './actionTypes';

export const fetchProblems = () => {
  return {
    type: FETCH_PROBLEMS,
    payload: [
      {
        title: 'Two Sum',
        desc:
          'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
        difficulty: 'easy',
        id: 1
      }
    ]
  };
};

