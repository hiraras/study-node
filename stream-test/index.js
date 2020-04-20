
// 标准输入输出
// process.stdin.pipe(process.stdout); // 输入马上返回输入的值

const fs = require('fs');
const path = require('path');
const filename = path.resolve(__dirname, 'data.txt');
const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Content-type', 'text/plain');
  const readStream = fs.createReadStream(filename);
  readStream.pipe(res);
});
server.listen(8002);
