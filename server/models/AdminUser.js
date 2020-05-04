const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false, /* 在查询的时候不查这个字段 */
    set (val) {
      return require('bcrypt').hashSync(val, 10); /* 密码加密保存 */
    }
  },
})

module.exports = mongoose.model('AdminUser', schema)