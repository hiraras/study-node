
const querystring = require('querystring');
const { handleBlogRouter } = require('./src/router/blog');
const { handleUserRouter } = require('./src/router/user');
const { METHODS } = require('./config/constant');

const serverHandle = (req, res) => {
  const { url, method } = req;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);
  res.setHeader('Content-type', 'application/json');
  if (method === METHODS.POST) {
    getPostBody(req).then(postData => {
      req.body = postData;
      getResponse(req, res);
    });
  }
}

const getPostBody = (req) => {
  return new Promise((resolve) => {
    if (req.headers['content-type'] === 'application/json') {
      let postData = '';
      req.on('data', thunk => {
        postData += thunk.toString();
      });
      req.on('end', () => {
        const result = postData ? JSON.parse(postData) : {};
        resolve(result);
      });
    } else {
      resolve({});
    }
  });
}

function getResponse(req, res) {
  const blogResData = handleBlogRouter(req, res);
  if (blogResData) {
    res.end(JSON.stringify(blogResData));
    return ;
  }

  const userResData = handleUserRouter(req, res);
  if (userResData) {
    res.end(JSON.stringify(userResData));
    return ;
  }

  // 未命中路由
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.write('404 Not Found\n');
  res.end();
}

module.exports = serverHandle;
