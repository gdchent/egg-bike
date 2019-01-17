module.exports = app => {
  return async (ctx, next) => {
    ctx.socket.emit('res', 'egg通知你，socket连接成功')
    await next()
    // execute when disconnect.
    console.log('断开连接')
  }
}
