
const redis = require('redis');

const port = 6379;
const host = '127.0.0.1';
const redisClient = redis.createClient(port, host);
redisClient.on('error', err => {
  console.log(err);
});

redisClient.set('realname', 'zhangsan2', redis.print);
redisClient.get('realname', (err, val) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(val);
  redisClient.quit();
});
