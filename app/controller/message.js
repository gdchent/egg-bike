'use strict'

const Controller = require('egg').Controller

class MessageController extends Controller {
  async getRooms () {
    const ctx = this.ctx
    let token = await ctx.helper.parseToken(ctx)
    let uId = token.id
    console.log(uId)
    let res = await ctx.model.Room.getRooms(uId)

    if (res) {
      ctx.helper.success(ctx, res)
    } else {
      ctx.helper.error(ctx, -1, '私信记录获取失败')
    }
  }

  // 创建一条msg
  // FIXME: 里面的sendId应该是从token中提取
  async createMessage (body) {
    const ctx = this.ctx
    let roomId = ctx.params.roomId
    let res = ctx.model.Message.createMessage({ roomId: Number(roomId), ...ctx.request.body })
    // FIXME: 我的天，一条消息插一次数据库，redis的作用？
    if (res) {
      ctx.helper.success(ctx, res)
    } else {
      ctx.helper.error(ctx, -1, '私信发送失败')
    }
  }

  // async getMsg () {
  //   const ctx = this.ctx
  //   let roomId = ctx.params.roomId

  //   // 哦，要在service里面处理
  //   let res = await ctx.service.message.getMessages(roomId)

  //   // let token = await ctx.helper.parseToken(ctx)
  //   // let myId = token.id
  //   // let otherId = ctx.params.otherId
  // }

  // 通过roomid 获取聊天ist
  async getMsgsByRoomId () {
    const ctx = this.ctx
    let roomId = ctx.params.roomId
    let res = await ctx.model.Message.getMsgsByRoomId(Number(roomId))

    if (res) {
      ctx.helper.success(ctx, res)
    } else {
      ctx.helper.error(ctx, -1, '用户文章获取失败')
    }
  }
}

module.exports = MessageController
