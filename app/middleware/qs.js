// ctx.query number类型处理

module.exports = options => {
  return async function ifAdmin (ctx, next) {
    if (!ctx.query) await next()
    let q = ctx.query
    Object.keys(q).forEach(k => {
      if (!Number.isNaN(Number.parseInt(q[k]))) {
        q[k] = Number.parseInt(k)
      }
    })
    await next()
  }
}
