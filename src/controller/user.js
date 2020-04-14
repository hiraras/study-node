
const { exec } = require('../db/mysql');

const login = (postData = { username: '', password: '' }) => {
  const { username, password } = postData;
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `;
  return exec(sql).then(result => {
    if (result && result.length) {
      return Promise.resolve(result);
    } else {
      return Promise.reject('user account not matched');
    }
  });
}

module.exports = {
  login
}
