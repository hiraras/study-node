
const fs = require('fs');
const path = require('path');
const { SuccessModel, ErrorModel } = require('../src/model/resModel');
const crypto = require('crypto');
const SECRET_KEY = 'Wfjie_fjFIE5E6';

function responseWrapper(promise) {
  return promise.then(data => {
    return new SuccessModel(data, 'success');
  }).catch(err => {
    const msg = typeof err === 'string' ? err : err.message;
    return new ErrorModel(null, `fail: ${msg}`);
  });
}

function createWriteStream(filename) {
  // 能拼接多个参数
  const fullFilename = path.join(__dirname, '../', 'logs', filename);
  return fs.createWriteStream(fullFilename, {
    flags: 'a' // 添加
  });
}

function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

const assessWriteStream = createWriteStream('assess.log');
function assessLog(log) {
  writeLog(assessWriteStream, log);
}

function md5(content) {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

function genPassword(psw) {
  return md5(`${psw}${SECRET_KEY}`);
}

module.exports = {
  responseWrapper,
  assessLog,
  genPassword
}
