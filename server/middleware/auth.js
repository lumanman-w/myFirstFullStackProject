const assert = require('http-assert');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

module.exports = (options, app) => {
  return async (req, res, next) => {
    let token = req.headers.authorization ? String(req.headers.authorization).split(' ').pop() : '';
    assert(token, 401, '请先登录'); // 因为jwt验证时，token不能为空
    let { id } = jwt.verify(token, req.app.get('secret'));
    assert(id, 401, '请先登录');
    let user = await AdminUser.findById(id);
    req.user = user;
    assert(req.user, 401, '请先登录');
    await next()
  }
}

// 下面这种写法依然可以生效，但是并且可以直接调用，但是就可能灵活的处理这个方法，当auth需要多种处理方式的时候，就会需要写多个auth.js来处理，并不合理
// 所以写成上面这种返回一个方法的形式，可以接受参数，并且处理多种情况
/* module.exports = async (req, res, next) => {
  let token = req.headers.authorization ? String(req.headers.authorization).split(' ').pop() : '';
  assert(token, 401, '请先登录'); // 因为jwt验证时，token不能为空
  let { id } = jwt.verify(token, app.get('secret'));
  assert(id, 401, '请先登录');
  let user = await AdminUser.findById(id);
  req.user = user;
  assert(req.user, 401, '请先登录');
  await next()
} */