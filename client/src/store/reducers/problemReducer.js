import { FETCH_PROBLEMS } from '../actions/actionTypes';

const initialState = {
  problems: [
    {
      title: 'Two Sum',
      desc:
        'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
      difficulty: 'easy',
      id: 1
    },
    {
      title: 'Add Two Numbers',
      desc:
        'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.',
      difficulty: 'medium',
      id: 2
    },
    {
      title: 'Longest Substring Without Repeating Characters',
      desc:
        'Given a string, find the length of the longest substring without repeating characters.',
      difficulty: 'medium',
      id: 3
    },
    {
      title: 'Median of Two Sorted Arrays',
      desc:
        'There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
      difficulty: 'hard',
      id: 4
    }
  ]
};

// const fetchProblems = (state, action) => {
//   return { ...state, problems: action.payload };
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROBLEMS:
      // return fetchProblems(state, action);
      return state;
    default:
      return state;
  }
};

export default reducer;
