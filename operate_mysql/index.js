
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'myblog'
});

con.connect();

const sql = 'select * from users;';
const updateSql = `update users set password='123456' where username='zhangsan'`;
const insertSql = `insert into users (username, password, realname) values('lisi', '654.21', '李四')`;
con.query(insertSql, (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log(result);
});

con.end();
