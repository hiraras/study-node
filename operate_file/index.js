
const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');

// 读取
function read(fileName) {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log(data.toString());
  });
}

function write(fileName, content, opt) {
  fs.writeFile(fileName, content, opt, (err) => {
    console.log(err);
  });
}
const content = "new message\n";
const opt = {
  flag: 'a' // append追加，w为write，覆盖写入
}
read(fileName);
write(fileName, content, opt);
read(fileName);

function exist(fileName) {
  fs.exists(fileName, (exist) => {
    console.log('exist:', exist);
  });
}
exist(fileName);