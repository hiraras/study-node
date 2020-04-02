
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

module.exports = {
  getList
}
