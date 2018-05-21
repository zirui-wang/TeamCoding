const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const problemService = require('../services/problemService');

app.get('/problems', (req, res) => {
  problemService.getProblems().then(problems => {
    res.json(problems);
  });
});

app.get('/problems/:id', (req, res) => {
  const id = req.params.id;
  problemService.getProblem(+id).then(problem => {
    res.json(problem);
  });
});

app.post('/problems', jsonParser, (req, res) => {
  problemService.addProblem(req.body).then(
    problem => {
      res.json(problem);
    },
    err => {
      res.status(400).send('Problem name already exist');
    }
  );
});

module.exports = app;
