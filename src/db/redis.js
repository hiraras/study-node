
const redis = require('redis');
const { REDIS_CONF } = require('../../config');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', err => {
  console.log(err);
});

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        return reject(err);
      }
      console.log(val);
      try {
        resolve(JSON.parse(val));
      } catch (err) {
        resolve(val);
      }
    });
  });
}

module.exports = {
  get,
  set,
}