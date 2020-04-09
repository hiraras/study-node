const { SuccessModel, ErrorModel } = require('../src/model/resModel');

function add(a, b) {
  return a + b;
}

const responseWrapper = promise => {
  return promise.then(data => {
    return new SuccessModel(data);
  }).catch(err => {
    return new ErrorModel(null, `fail ${err.message}`);
  });
}

module.exports = {
  add,
  responseWrapper
}
