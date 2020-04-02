
const CONSTANT = require('../../config/constant');
const { getList, getDetail } = require('../controller/blog');
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
    const { id = '' } = req.query;
    const resData = getDetail(id);
    return new SuccessModel(resData, 'success');
  }

  // 新建一篇博客
  if (method === CONSTANT.METHODS.POST && path === '/api/blog/new') {
    return new SuccessModel(null, 'success');
  }

  // 更新一篇博客
  if (method === CONSTANT.METHODS.POST && path === '/api/blog/update') {
    return {
      msg: '这是更新博客的接口'
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