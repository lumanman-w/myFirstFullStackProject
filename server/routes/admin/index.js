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
}