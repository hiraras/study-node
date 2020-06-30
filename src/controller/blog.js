
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
  const sql = `select * from blogs where id=${id}`;
  return exec(sql);
}

const newBlog = (data = {}) => {
  console.log(data);
  let sql = `
    insert into blogs (title, content, createtime, author)
    values ('${data.title}', '${data.content}', ${Date.now()}, '${data.author}');
  `;
  return exec(sql).then(insertResult => {
    if (insertResult.affectedRows === 1) {
      return Promise.resolve({
        id: insertData.insertId
      });
    } else {
      return Promise.reject('fail to add new blog');
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}

const updateBlog = (id, data) => {
  let sql = `
    update blogs set title='${data.title || ''}', content='${data.content || ''}' where id=${id || ''};
  `;
  return exec(sql).then(updateResult => {
    if (updateResult.affectedRows > 0) {
      return Promise.resolve({ id });
    } else {
      return Promise.reject('fail to add new blog');
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}

const deleteBlog = (id = '', author = '') => {
  let sql = `
    delete from blogs where id=${id} and author='${author}';
  `;
  return exec(sql).then(delResult => {
    if (delResult.affectedRows > 0) {
      return Promise.resolve({ id });
    } else {
      return Promise.reject('fail to delete the blog');
    }
  }).catch(err => {
    return Promise.reject(err);
  });
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
