
const CONSTANT = require('../../config/constant');
const { login } = require('../controller/user');
const { responseWrapper } = require('../../common/utils');
const { get, set } = require('../db/redis');

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
      set(req.session.userId, data);
      return responseWrapper(Promise.resolve(data));
    }).catch(err => {
      return responseWrapper(Promise.reject(err));
    });
  }

  if (method === CONSTANT.METHODS.GET && path === '/api/user/login-test') {
    return get(req.session.userId).then(data => {
      if (data) {
        return responseWrapper(Promise.resolve(data));
      } else {
        return responseWrapper(Promise.reject('authority lost'));
      }
    }).catch(err => {
      return responseWrapper(Promise.reject(err));
    });
  }
}

module.exports = {
  handleUserRouter
}
