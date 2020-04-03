
const CONSTANT = require('../../config/constant');
const { getList, getDetail, newBlog, updateBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) => {
  const { method, url } = req;
  const path = req.path;

  // 获取博客列表
  if (method === CONSTANT.METHODS.GET && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    const resData = getList(author, keyword);
    return new SuccessModel(resData);
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
      const resData =  updateBlog(id);
      return new SuccessModel(resData, 'success');
    } catch (err) {
      return new ErrorModel(null, `fail ${err.message}`);
    }
  }

  // 删除一篇博客
  if (method === CONSTANT.METHODS.DELETE && path === '/api/blog/del') {
    return {
      msg: '这是删除博客的接口'
    }
  }
}

module.exports = {
  handleBlogRouter
}