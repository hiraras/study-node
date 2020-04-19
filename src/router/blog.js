
const CONSTANT = require('../../config/constant');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { responseWrapper } = require('../../common/utils');
const { get } = require('../db/redis');

const handleBlogRouter = (req) => {
  const { method } = req;
  const path = req.path;
  const delRequestReg = /(?<=del\/)\d+$/g;

  if (!req.session.username) {
    return responseWrapper(Promise.reject('not login'));
  }

  // 获取博客列表
  if (method === CONSTANT.METHODS.GET && path === '/api/blog/list') {
    let { author = '' } = req.query;
    const { keyword = '', isAdmin = false } = req.query;
    if (isAdmin) {
      author = req.session.username;
    }
    return responseWrapper(getList(author, keyword));
  }

  // 获取博客详情
  if (method === CONSTANT.METHODS.GET && path === '/api/blog/detail') {
    return responseWrapper(getDetail(req.query.id));
  }

  // 新建一篇博客
  if (method === CONSTANT.METHODS.POST && path === '/api/blog/new') {
    req.body.author = req.session.username;
    return responseWrapper(newBlog(req.body));
  }

  // 更新一篇博客
  if (method === CONSTANT.METHODS.POST && path === '/api/blog/update') {
    const { id, content, title } = req.body;
    return responseWrapper(updateBlog(id, { title, content }));
  }

  // 删除一篇博客
  if (method === CONSTANT.METHODS.DELETE && path.includes('/api/blog/del')) {
    const matchRes = path.match(delRequestReg);
    const id = matchRes && matchRes[0];
    const author = req.session.username;
    return responseWrapper(deleteBlog(id, author));
  }
}

module.exports = {
  handleBlogRouter
}
