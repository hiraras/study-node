
const CONSTANT = require('../../config/constant');

const handleUserRouter = (req, res) => {
  const { method, url } = req;
  const path = req.path;
  // 登录
  if (method === CONSTANT.METHODS.POST && path === '/api/user/login') {
    return {
      msg: '这是登录接口'
    }
  }
}

module.exports = {
  handleUserRouter
}
