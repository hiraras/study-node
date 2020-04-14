
const CONSTANT = require('../../config/constant');
const { login } = require('../controller/user');
const { responseWrapper } = require('../../common/utils');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 86400000);
  return d.toGMTString();
}

const handleUserRouter = (req, res) => {
  const { method, path, query, session } = req;
  // 登录
  if (method === CONSTANT.METHODS.GET && path === '/api/user/login') {
    return login(query).then(data => {
      res.setHeader('Set-Cookie', `userid=${session.userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
      session.username = data[0].username;
      session.realname = data[0].realname;
      return responseWrapper(Promise.resolve(data));
    }).catch(err => {
      return responseWrapper(Promise.reject(err));
    });
  }

  if (method === CONSTANT.METHODS.GET && path === '/api/user/login-test') {
    if (req.session.username) {
      return responseWrapper(Promise.resolve({
        username: req.session.username,
        realname: req.session.realname
      }));
    } else {
      return responseWrapper(Promise.reject('authority lost'));
    }
  }
}

module.exports = {
  handleUserRouter
}
