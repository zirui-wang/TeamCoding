let problems = [
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
];

const ProblemModel = require('../models/problemModel');

const getProblems = () => {
  return new Promise((resolve, reject) => {
    ProblemModel.find({}, (err, problems) => {
      if (err) {
        reject(err);
      } else {
        resolve(problems);
      }
    });
  });
};

const getProblem = id => {
  return new Promise((resolve, reject) => {
    ProblemModel.findOne({ id: id }, (err, problem) => {
      if (err) {
        reject(err);
      } else {
        resolve(problem);
      }
    });
  });
};

const addProblem = newProblem => {
  return new Promise((resolve, reject) => {
    ProblemModel.findOne({ title: newProblem.title }, (err, problem) => {
      if(problem) {
        reject('Problem already exist');
      }else{
        ProblemModel.count({}, (err, num) => {
          newProblem.id = num + 1;
          const mongoProblem = new ProblemModel(newProblem);
          mongoProblem.save();
          resolve(newProblem);
        })
      }
    });
  });
};

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
};
