module.exports = app => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://127.0.0.1:27017/myFirstFullStackProject', {
    useNewUrlParser: true
  })
}

/* module.exports导出的是一个函数，接收一个参数app */