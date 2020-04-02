
const http = require('http');
const { port } = require('../config');
const serverHandle = require('../app');

const server = http.createServer(serverHandle);
server.listen(port, () => {
  console.log(`listen on ${port} port`);
});
