module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true, /* 由于在app.use处定义了参数，又要在router里面使用这个参数，所以需要合并参数 */
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body) // 创建数据
    res.send(model)
  })

  router.get('/', async (req, res) => {
    let queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = 'parent';
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10) // 获取数据列表10条 .populate()表示关联取出某个字段
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id) // 根据ID获取数据
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body) // 修改数据
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body) // 删除数据
    res.send({
      success: true
    })
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource); /* 将小写的复数形式转化为首字母大写的单数形式 */
    req.Model = require(`../../models/${modelName}`);
    next()
  }, router)

  /* multer 用于处理上传的文件 */
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' }) /* __dirname表示当前文件夹的绝对地址 */
  /* upload.single('file') -- 接收单个文件的上传 */
  app.use('/admin/api/upload', upload.single('file'), async (req, res) => {
    /* 本身没有req.file,因为用了中间件处理了一次，所以有了req.file */
    const file = req.file;
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.use('/admin/api/login', async (req, res) => {
    // 1、根据用户名找用户
    const { username, password } = req.body;
    const AdminUser = require('../../models/AdminUser');
    let user = await AdminUser.findOne({ username }).select('+password');
    if (!user) {
      res.status(422).send({
        message: '用户不存在'
      })
    }
    // 2、校验密码
    const isValid = require('bcrypt').compareSync(password, user.password);
    if (!isValid) {
      res.status(422).send({
        message: '密码不正确'
      })
    }
    // 3、返回token
    let jwt = require('jsonwebtoken');
    let token = jwt.sign({ id: user._id }, app.get('secret')); // app.get() 与获取路由的方法冲突，通过参数来区分，只有一个参数就是获取配置
    res.send({ token });
  })
}