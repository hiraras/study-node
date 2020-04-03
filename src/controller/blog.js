
const getList = (author, keyword) => {
  return new Array(10).fill(0).map((elem, index) => {
    return {
      id: index + 1,
      title: '标题' + index,
      content: '内容' + index,
      createTime: Date.now(),
      author,
      keyword
    }
  })
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

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog
}
