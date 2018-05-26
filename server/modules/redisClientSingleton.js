const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
  }

  set = (key, value, callback) => {
    this.client.set(key, value, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      callback(res);
    });
  };

  get = (key, callback) => {
    this.client.get(key, value, (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      callback(res);
    });
  };
}
