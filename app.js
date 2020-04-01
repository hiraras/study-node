const http = require('http');
const querystring = require('querystring');
const CONSTANT = require('./config/constant');

const server = http.createServer((req, res) => {
  const { url, method } = req;
  const path = querystring.parse(url.split('?')[0]);
  const query = querystring.parse(url.split('?')[1]);

  const resData = {
    url, method, path, query
  }
  
  res.setHeader('Content-type', 'application/json');
  if (method === CONSTANT.METHODS.GET) {
    res.end(JSON.stringify(resData));
  } else if (method === CONSTANT.METHODS.POST) {
    let postData = '';
    req.on('data', thunk => {
      postData += thunk.toString();
    });
    req.on('end', () => {
      res.end(JSON.stringify({
        ...resData,
        postData: JSON.stringify(postData)
      }));
    });
  }


});

server.listen(3000, () => {
  console.log('listening on 3000 port');
});
