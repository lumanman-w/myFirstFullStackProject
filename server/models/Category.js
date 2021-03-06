const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
  } /* 类型是  mongoose.SchemaTypes.ObjectId,关联Category模型*/
})

module.exports = mongoose.model('Category', schema)