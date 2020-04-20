
const fs = require('fs');
const path = require('path');
const { SuccessModel, ErrorModel } = require('../src/model/resModel');

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

module.exports = {
  responseWrapper,
  assessLog
}
