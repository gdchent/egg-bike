module.exports = options => {
  return async function ifAdmin (ctx, next) {
    const token = ctx.header['authorization']
    let res = await ctx.service.token.decodeToken(token)
    if (res.role !== 'admin') {
      ctx.status = 401
      ctx.body = {
        code: 0,
        msg: 'token错误'
      }
    } else {
      await next()
    }
  }
}
