
const redis = require('redis');

const port = 6379;
const host = '127.0.0.1';
const redisClient = redis.createClient(port, host);
redisClient.on('error', err => {
  console.log.err(err);
});

redisClient.set('realname', 'zhangsan2', redis.print);
redisClient.get('realname', (err, val) => {
  if (err) {
    console.err(err);
    return;
  }
  console.log(val);
  redisClient.quit();
});

// redis-cli // 进入redis命令行客户端
// set key value // 设置
// get key // 获取
// keys * // 获取全部键值
// del key // 删除