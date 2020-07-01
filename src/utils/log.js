
const fs = require('fs');
const path = require('path');

function createWriteStream(filename) {
  // 能拼接多个参数
  const fullFilename = path.join(__dirname, '../../', 'logs', filename);
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
  assessLog,
}
