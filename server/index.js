const express = require('express')

const app = express()

app.use(require('cors')()) // 引入跨域模块
app.use(express.json()) // 引用json模块
app.use('/uploads', express.static(__dirname + '/uploads')) // 静态托管文件

require('./plugins/db')(app) //连接数据库
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('App listening on port 3000');
})