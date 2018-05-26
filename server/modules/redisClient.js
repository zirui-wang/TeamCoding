const redis = require("redis");
const client = redis.createClient();

const set = (key, value, callback) => {
  client.set(key, value, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(res);
  });
}

const get = (key, callback) => {
  client.get(key, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    callback(res);
  });
}

const expire = (key, timeInSeconds) => {
  client.expire(key, timeInSeconds);
}

const quit = () => {
  client.quit();
}

const redisPrint = () => {
  redis.print();
}

module.exports = {
  get: get,
  set: set,
  expire: expire,
  quit: quit,
  redisPrint: redis.print
};
