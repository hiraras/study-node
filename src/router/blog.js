
const CONSTANT = require('../../config/constant');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { responseWrapper } = require('../../common/utils');

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const path = req.path;
  const delRequestReg = /(?<=del\/)\d$/g;

  // 获取博客列表
  if (method === CONSTANT.METHODS.GET && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    return responseWrapper(getList(author, keyword));
  }

  // 获取博客详情
  if (method === CONSTANT.METHODS.GET && path === '/api/blog/detail') {
    const resData = getDetail(id);
    return new SuccessModel(resData, 'success');
  }

  // 新建一篇博客
  if (method === CONSTANT.METHODS.POST && path === '/api/blog/new') {
    const resData = newBlog(req.body);
    return new SuccessModel(resData, 'success');
  }

  // 更新一篇博客
  if (method === CONSTANT.METHODS.POST && path === '/api/blog/update') {
    const { id } = req.body;
    try {
      const resData = updateBlog(id);
      return new SuccessModel(resData, 'success');
    } catch (err) {
      return new ErrorModel(null, `fail ${err.message}`);
    }
  }

  // 删除一篇博客
  if (method === CONSTANT.METHODS.DELETE && path.includes('/api/blog/del')) {
    const matchRes = path.match(delRequestReg);
    const id = matchRes && matchRes[0];
    try {
      const resData = deleteBlog(id);
      return new SuccessModel(resData, 'success');
    } catch (err) {
      return new ErrorModel(null, `fall ${err.message}`);
    }
  }
}

module.exports = {
  handleBlogRouter
}
