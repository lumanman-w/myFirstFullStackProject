module.exports = app => {
  const express = require('express')
  const Category = require('../../models/Category')
  const router = express.Router()

  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body) // 创建数据
    res.send(model)
  })

  router.get('/categories', async (req, res) => {
    const items = await Category.find().populate('parent').limit(10) // 获取数据列表10条 .populate()表示关联取出某个字段
    res.send(items)
  })

  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id) // 根据ID获取数据
    res.send(model)
  })

  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body) // 修改数据
    res.send(model)
  })

  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body) // 删除数据
    res.send({
      success: true
    })
  })

  app.use('/admin/api', router)
}