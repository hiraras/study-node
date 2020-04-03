
const CONSTANT = require('../../config/constant');
const { checkLogin } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleUserRouter = (req, res) => {
  const { method, path } = req;
  // 登录
  if (method === CONSTANT.METHODS.POST && path === '/api/user/login') {
    const loginSuccess = checkLogin(req.body);
    if (loginSuccess) {
      return new SuccessModel(null, 'success');
    } else {
      return new ErrorModel(null, 'username or password not matched');
    }
  }
}

module.exports = {
  handleUserRouter
}
