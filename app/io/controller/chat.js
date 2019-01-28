'use strict'

const Controller = require('egg').Controller

class ChatController extends Controller {
  async test () {
    const { ctx } = this
    const message = ctx.args[0]
    console.log(ctx.onlineUsers)
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`)
  }
  // 发送给火狐
  async sendToOther () {

  }
}

module.exports = ChatController
