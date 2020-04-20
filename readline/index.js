
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filename = path.resolve(__dirname, '../logs/assess.log');
const readStream = fs.createReadStream(filename);
const rl = readline.createInterface({
  input: readStream
});

let sum = 0;
let chromeNum = 0;
rl.on('line', (lineData) => {
  if (!lineData) {
    return;
  }
  sum ++;
  if (lineData.includes('Chrome')) {
    chromeNum ++;
  }
});

rl.on('close', () => {
  console.log('chrome访问占比:', chromeNum / sum);
});
