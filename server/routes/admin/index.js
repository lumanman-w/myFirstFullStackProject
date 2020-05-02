module.exports = app => {
  const express = require('express')
  const Category = require('../../models/Category')
  const router = express.Router()

  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body) // 创建数据
    res.send(model)
  })

  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(10) // 创建数据
    res.send(items)
  })
  app.use('/admin/api', router)
}