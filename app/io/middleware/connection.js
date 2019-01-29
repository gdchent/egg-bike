module.exports = app => {
  let usersOnline = {}
  return async (ctx, next) => {
    const { app, socket, logger, helper } = ctx

    ctx.socket.emit('res', 'egg通知你，socket连接成功')
    let token = ctx.socket.handshake.query.token
    // FIXME: 其实这个token可能过期了？
    if (token) {
      let res = await ctx.service.token.verifyToken(token.split(' ')[1])
      let uIdStr = String(res.message.id)
      if (!(uIdStr in usersOnline) && uIdStr !== 'undefined') {
        usersOnline[uIdStr] = uIdStr
        global.onlines = usersOnline
        console.log(global.onlines)
      }
    }
    // FIXME: 不知道怎么搞全局变量，怎么共用线上用户列表

    // ctx.onlineUsers = 123
    await next()
    // execute when disconnect.
    console.log('断开连接')
  }
}
