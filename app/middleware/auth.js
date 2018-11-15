// admin 验证中间件
module.exports = options => {
  return async function auth (ctx, next) {
    await next()
    ctx.body = [...ctx.body, 'admin']
  }
}
