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
