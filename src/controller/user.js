
const checkLogin = (postData = { username: '', password: '' }) => {
  const username = 'zhangsan';
  const psw = '123';
  return username === postData.username && psw === postData.password;
}

module.exports = {
  checkLogin
}
