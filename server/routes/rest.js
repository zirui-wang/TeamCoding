const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const node_rest_client = require('node-rest-client').Client;
const rest_client = new node_rest_client();

const problemService = require('../services/problemService');
const keys = require('../config/keys');

rest_client.registerMethod('build_and_run', keys.excutorServerUrl, 'POST');

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

app.post('/build_and_run', jsonParser, (req, res) => {
  const userCode = req.body.user_code;
  const lang = req.body.lang;
  console.log(lang + ': ' + userCode);
  
  rest_client.methods.build_and_run(
    {
      data: { code: userCode, lang: lang },
      headers: { 'Content-Type': 'application/json' }
    },
    (data, response) => {
      console.log('Received response from execution server: ' + response);
      console.log(data);
      const text = `Build output: ${data['build']}
      Execute output: ${data['run']}`;
      data['text'] = text;
      res.json(data);
    }
  );
});

module.exports = app;
