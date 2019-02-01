'use strict'

const Controller = require('egg').Controller

class ChatController extends Controller {
  async test () {
    const { ctx } = this
    const message = ctx.args[0]
    // console.log(global.onlines)
    // console.log(socket.id)
    // const query = socket.handshake.query
    // 用户信息
    // const { userId } = query
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`)
  }
  // 发送给火狐(指定对象)
  async sendToOther () {
    const ctx = this.ctx
    const message = ctx.args[0]
    await ctx.socket.emit('res', `Hi! I've got your message: ${message}`)
  }
  async exchange () {
    const ctx = this.ctx
    // FIXME: 要在这里获取userId么
    const info = ctx.args[0] || {}
    // const socket = ctx.socket
    // const client = socket.id

    // FIXME: 这里的'3'是写死的
    ctx.app.io.of('/').emit(String(info.id), info.msg)
  }
}

module.exports = ChatController
