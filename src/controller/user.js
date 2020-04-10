
const { exec } = require('../db/mysql');

const checkLogin = (postData = { username: '', password: '' }) => {
  const { username, password } = postData;
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `;
  console.log(sql);
  return exec(sql).then(result => {
    if (result && result.length) {
      return Promise.resolve(true);
    } else {
      return Promise.reject('user account not matched');
    }
  });
}

module.exports = {
  checkLogin
}
