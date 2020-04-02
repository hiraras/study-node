
const querystring = require('querystring');
const { handleBlogRouter } = require('./src/router/blog');
const { handleUserRouter } = require('./src/router/user');

const serverHandle = (req, res) => {
  const { url } = req;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);
  res.setHeader('Content-type', 'application/json');

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
