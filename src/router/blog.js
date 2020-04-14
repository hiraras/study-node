
const CONSTANT = require('../../config/constant');
const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog');
const { responseWrapper } = require('../../common/utils');

const handleBlogRouter = (req) => {
  const { method } = req;
  const path = req.path;
  const delRequestReg = /(?<=del\/)\d+$/g;

  // 获取博客列表
  if (method === CONSTANT.METHODS.GET && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query;
    return responseWrapper(getList(author, keyword));
  }

  // 获取博客详情
  if (method === CONSTANT.METHODS.GET && path === '/api/blog/detail') {
    return responseWrapper(getDetail(req.query.id));
  }

  // 新建一篇博客
  if (method === CONSTANT.METHODS.POST && path === '/api/blog/new') {
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
    return responseWrapper(deleteBlog(id));
  }
}

module.exports = {
  handleBlogRouter
}
