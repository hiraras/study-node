const { SuccessModel, ErrorModel } = require('../src/model/resModel');

function add(a, b) {
  return a + b;
}

const responseWrapper = promise => {
  return promise.then(data => {
    return new SuccessModel(data, 'success');
  }).catch(err => {
    const msg = typeof err === 'string' ? err : err.message;
    return new ErrorModel(null, `fail: ${msg}`);
  });
}

module.exports = {
  add,
  responseWrapper
}
