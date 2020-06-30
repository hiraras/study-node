
const fs = require('fs');
const path = require('path');

function createWriteStream(filename) {
  // 能拼接多个参数
  // const fullFilename = path.join(__dirname, '../', 'logs', filename);
  return fs.createWriteStream(filename, {
    flags: 'a' // 添加
  });
}

function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

function copyFile(filename1, filename2) {
  return new Promise(function(resolve) {
    const readStream = fs.createReadStream(filename1);
    const writeStream = fs.createWriteStream(filename2);
    readStream.pipe(writeStream);
    readStream.on('end', () => {
      console.log('copy completed');
      clearFile(filename1);
      resolve();
    });
  });
}

function clearFile(filename) {
  fs.createWriteStream(filename).write('');
}

function assessLog(log) {
  const filename = `${formatDateOfDay(new Date())}.assess.log`;
  const fullFilename = path.join(__dirname, '../', 'logs/assess-logs', filename);
  const assessLogFile = path.join(__dirname, '../', 'logs', 'assess.log');
  let assessWriteStream = null;
  fs.exists(fullFilename, function(exist) {
    if (!exist) {
      copyFile(assessLogFile, fullFilename).then(() => {
        assessWriteStream = createWriteStream(assessLogFile, {
          flags: 'a'
        });
        writeLog(assessWriteStream, log);
      });
    } else {
      assessWriteStream = createWriteStream(assessLogFile, {
        flags: 'a'
      });
      writeLog(assessWriteStream, log);
    }
  })
}

function formatDateOfDay(date) {
  const d = new Date(date.setHours(0, 0, 0, 0));
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

module.exports = {
  assessLog
}
