
const CONSTANT = require('../../config/constant');
const { checkLogin } = require('../controller/user');
const { responseWrapper } = require('../../common/utils');

const handleUserRouter = (req, res) => {
  const { method, path } = req;
  // 登录
  if (method === CONSTANT.METHODS.POST && path === '/api/user/login') {
    return responseWrapper(checkLogin(req.body));
  }
}

module.exports = {
  handleUserRouter
}
