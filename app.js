
const querystring = require('querystring');
const { handleBlogRouter } = require('./src/router/blog');
const { handleUserRouter } = require('./src/router/user');
const { METHODS } = require('./src/conf/constant');
const { get, set } = require('./src/db/redis');
const { assessLog } = require('./src/utils/log');
const fs = require('fs');
const path = require('path');

function setCookie(req) {
  const cookieStr = req.headers.cookie || '';
  req.cookie = {};
  cookieStr && cookieStr.split(';').map(item => {
    const [key, value] = item.split('=');
    req.cookie[key.trim()] = value.trim();
  });
}

function setQuery(req) {
  req.query = querystring.parse(req.url.split('?')[1]);
}

const serverHandle = (req, res) => {
  const { url, method } = req;

  setCookie(req);
  setQuery(req);
  // 允许跨域
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // 浏览器发送options请求时，可能会报 Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response. 这个错误
  // 可以通过添加下面代码解决
  // res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  req.path = url.split('?')[0];

  // 写日志
  // assessLog({ a: 1 }); // 会自动调用toString方法转为字符串再写入日志 [object Object]
  assessLog(`${req.method} -- ${req.url.split('?')[0]} -- ${req.headers['user-agent']} -- ${Date.now()}`);
  if (req.path === '/assets/video/2-4+debugge.mp4') {
    res.writeHead(200, {'Content-Type': 'video/mp4'});  
    const filename = path.resolve(__dirname, './assets/video/2-4+debugge.mp4');
    var rs = fs.createReadStream(filename);  
    
    rs.pipe(res);
    rs.on('error', (error) => {
      console.log(error)
    })
    
    rs.on('end',function(){  
      res.end();
      console.log('end call');  
    }); 
    return ;
  }

  if (method === METHODS.POST) {
    getPostBody(req).then(postData => {
      req.body = postData;
      getSession(req, res);
    }).catch(err => {
      res.end('fail' + err.message);
    });
  } else if(method === METHODS.OPTIONS) {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  } else {
    getSession(req, res);
  }
}

const getPostBody = (req) => {
  return new Promise((resolve, reject) => {
    if (req.headers['content-type'] === 'application/json') {
      let postData = '';
      req.on('data', chunk => {
        postData += chunk.toString();
      });
      req.on('end', () => {
        try {
          const result = postData ? JSON.parse(postData) : {};
          resolve(result);
        } catch(e) {
          reject(e);
        }
      });
    } else {
      resolve({});
    }
  });
}

function getSession(req, res) {
  req.session = {};
  let userId = req.cookie.userId;
  if (!userId) {
    userId = `${Date.now()}_${Math.floor(Math.random() * 100)}`;
    req.session.userId = userId;
    getResponse(req, res);
  } else {
    get(userId).then(data => {
      req.session = {
        ...data,
        userId
      };
      getResponse(req, res);
    }).catch(err => {
      res.end(`redis 500 ${err.message}`);
    });
  }
}

function getResponse(req, res) {
  const blogResData = handleBlogRouter(req, res);
  res.setHeader('Content-type', 'application/json');
  // res.setHeader('Content-type', 'text/plain')

  const userResData = handleUserRouter(req, res);
  if (userResData) {
    return userResData.then(data => {
      res.end(JSON.stringify(data));
    });
  }

  if (blogResData) {
    return blogResData.then(data => {
      res.end(JSON.stringify(data));
    });
  }

  // 未命中路由
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.write('<h1>404 not found</h1>');
  res.end();
}

module.exports = serverHandle;
