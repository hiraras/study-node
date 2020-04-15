
const env = process.env.NODE_ENV;

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'myblog',
  port: '3306'
};

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myblog',
    port: '3306'
  }
}

if (env === 'prod') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myblog',
    port: '3306'
  }
}

module.exports = {
  port: 3000,
  MYSQL_CONF
}
