# Team Coding (Under construction...)

A collaborative online judgement platform supporting add/delete/edit problems. Currently this project `only` support `Python` build and run.

Tech Stack:

* React
* NodeJS
* Express
* Mongodb
* Redis
* Docker

## Usage

Firstly, open the Redis Server:

```sh
$ redis-server /usr/local/etc/redis.conf
```

## Config

1. Create `dev.js` under `./server/config`:

  ```js
  module.exports = {
    mongoURI: 'mongodb://xxx',
    excutorServerUrl: 'xxx'
  };
  ```

2. Port Used:

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
3. Add more collabrative control in editor.
4. Deloy through AWS.