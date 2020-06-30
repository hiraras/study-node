
const CONSTANT = require('../../config/constant');
const { login } = require('../controller/user');
const { responseWrapper } = require('../../common/utils');
const { set } = require('../db/redis');

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 86400000);
  return d.toGMTString();
}

const handleUserRouter = (req, res) => {
  const { method, path, body } = req;
  // 登录
  if (method === CONSTANT.METHODS.POST && path === '/api/user/login') {
    return login(body).then(data => {
      const userId = `${Date.now()}_${Math.floor(Math.random() * 100)}`;
      res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
      set(userId, data[0]);
      return responseWrapper(Promise.resolve(data));
    }).catch(err => {
      return responseWrapper(Promise.reject(err));
    });
  }
}

module.exports = {
  handleUserRouter
}
