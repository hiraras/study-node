
const http = require('http');
const { serverPort } = require('../src/conf/db');
const serverHandle = require('../app');

const server = http.createServer(serverHandle);
server.listen(serverPort, () => {
  console.log(`listen on ${serverPort} port`);
});
