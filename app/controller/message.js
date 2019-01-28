'use strict'

const Controller = require('egg').Controller

class MessageController extends Controller {
  async getMsg () {
    const ctx = this.ctx
    console.log(111)
    ctx.body = {
      ll: 'test io'
    }
    // let token = await ctx.helper.parseToken(ctx)
    // let myId = token.id
    // let otherId = ctx.params.otherId
  }
}

module.exports = MessageController
