
const { exec } = require('../db/mysql');


const getList = (author, keyword) => {
  // 1=1 适配后续内容
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;
  return exec(sql);
}

const getDetail = (id) => {
  return {
    id,
    title: '标题' + id,
    content: '内容' + id,
    createTime: Date.now(),
    author: '张三',
  }
}

const newBlog = (data = {}) => {
  return {
    ...data,
    id: 3
  }
}

const updateBlog = id => {
  if (!id) {
    throw new Error('lose id');
  }
  return {
    id,
    title: '标题' + id,
    content: '内容' + id,
    createTime: Date.now(),
    author: '张三',
  }
}

const deleteBlog = id => {
  if (!id) {
    throw new Error('lose id');
  }
  return {
    id,
    title: '标题' + id,
    content: '内容' + id,
    createTime: Date.now(),
    author: '张三',
  }
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
