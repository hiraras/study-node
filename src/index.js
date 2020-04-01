
// import { add } from './a.js'; // 好像需要配置才能支持
const { add } = require('../common/index.js');
const _ = require('lodash');
const config = {
  domain: '127.0.0.1',
}

console.log(config);
console.log(add(12, 3));

console.log('arr:', _.concat([1, 2, 3], 4));








