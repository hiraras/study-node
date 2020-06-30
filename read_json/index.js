const fs = require('fs');
const path = require('path');

// function getFileContent(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       throw err;
//     }
//     callback(JSON.parse(data.toString()));
//   });
// }

// getFileContent('a.json', (data) => {
//   console.log(data);
// });

function getFileContent(fileName) {
  return new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data.toString()));
    });
  });
}

// getFileContent('a.json').then(data => {
//   console.log(data);
//   return getFileContent(data.next);
// }).then(data => {
//   console.log(data);
//   return getFileContent(data.next);
// }).then(data => {
//   console.log(data);
// }).catch(err => {
//   console.log(err);
// });

async function readFiles() {
  const aData = await getFileContent('a.json');
  console.log(aData);
  const bData = await getFileContent('b.json');
  console.log(bData);
  const cData = await getFileContent('c.json');
  console.log(cData);
}

readFiles();
