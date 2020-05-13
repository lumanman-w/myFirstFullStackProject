module.exports = options => {
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource); /* 将小写的复数形式转化为首字母大写的单数形式 */
    req.Model = require(`../models/${modelName}`);
    next()
  }
}