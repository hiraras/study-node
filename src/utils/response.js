
const { SuccessModel, ErrorModel } = require('../model/resModel');

function responseWrapper(promise) {
  return promise.then(data => {
    return new SuccessModel(data, 'success');
  }).catch(err => {
    const msg = typeof err === 'string' ? err : err.message;
    return new ErrorModel(null, `fail: ${msg}`);
  });
}

module.exports = {
  responseWrapper,
}
