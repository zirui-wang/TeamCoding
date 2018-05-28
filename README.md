# Team Coding ![CircleCI](https://img.shields.io/circleci/project/github/RedSparr0w/node-csgo-parser.svg?style=flat-square)

A collaborative online judgement platform supporting adding problems. Currently this project only support `Python` build and run.

Tech Stack:

* React
* NodeJS
* Express
* Mongodb
* Redis
* Docker

## Features

### Collaboration: real-time content and cursor change

<img src="https://s1.gifyu.com/images/collaboration.gif" width=80% >

### Build and run: code can be complied and run, and then show the result

<img src="https://s1.gifyu.com/images/submit.gif" width=40%>

### Load current code: new user

<img src="https://s1.gifyu.com/images/load_code.gif" width=80%>

### Add new question: provide a form for addign questions

<img src="https://s1.gifyu.com/images/add_question.gif" width=40%>

## How to play

Firstly, open the Redis Server:

  ```sh
  $ redis-server /usr/local/etc/redis.conf
  ```

Run back-end(build and run) server:

  ```sh
  $ pip install -r requirements.txt
  $ python executor_server.py
  ```

Run client server:

  ```sh
  $ ./client/npm start
  ```

Run routing server:

  ```sh
  $ ./server/nodemon index.js
  ```

Of course, you can also use `concurrently` to run client & routing server at the sametime.

## Config

1. Create `dev.js` under `./server/config` (routing server):

  ```js
  module.exports = {
    mongoURI: 'mongodb://xxx',
    excutorServerUrl: 'xxx'
  };
  ```

2. Create `dev.js` under `./src/client/config` (client server):

  ```js
  export const AUTH_CONFIG = {
    domain: 'xxx.auth0.com',
    clientId: 'xxx',
    callbackUrl: 'http://localhost:3000/callback'
  }

  export const SERVER_CONFIG = {
    address: 'http://localhost:8080'
  }
  ```

3. Port Used:

  ```sh
  # Client Port:
  http://localhost:3000

  # Server Port:
  http://localhost:8080

  # Build&Run Port:
  http://localhost:5000
  ```

## TODO

1. Fix bugs.
2. User panel.
3. Add more user controls.
4. Deloy.

## License

MIT