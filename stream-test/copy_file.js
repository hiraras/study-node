
const fs = require('fs');
const path = require('path');

const filename1 = path.resolve(__dirname, 'data.txt');
const filename2 = path.resolve(__dirname, 'data2.txt');
const readStream = fs.createReadStream(filename1);
const writeStream = fs.createWriteStream(filename2);
readStream.pipe(writeStream);
readStream.on('data', thunk => {
  const str = thunk.toString();
  console.log(str);
  console.log('======================');
});
readStream.on('end', function(err) {
  if (err) console.log(err);
  console.log('over');
});