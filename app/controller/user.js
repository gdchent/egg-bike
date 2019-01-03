'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  // 获取自己
  async getMe () {
    const ctx = this.ctx
    let token = ctx.helper.getAccessToken(ctx)
    if (!token) ctx.helper.error(ctx, -1, '你的token呢')
    let verifyResult = await ctx.service.token.verifyToken(token)
    // ctx.body = verifyResult
    if (!verifyResult.verify) {
      ctx.helper.error(ctx, 401, verifyResult.message)
      return false
    }
    let id = verifyResult.message.id
    let user = await ctx.model.User.getUserById(id)
    ctx.helper.success(ctx, user)
  }

  async login () {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    let user = await ctx.model.User.getUserByName(username)
    if (!user) {
      ctx.helper.error(ctx, -1, '该账户不存在')
    } else {
      if (password !== user.password) {
        ctx.helper.error(ctx, -1, '密码错误')
      } else {
        let token = await ctx.service.token.createToken({ role: 'user', id: user.Id })
        ctx.helper.success(ctx, { token })
      }
    }
  }

  async getUserById () {
    const ctx = this.ctx
    const id = ctx.params.id
    let user = await ctx.model.User.getUserById(id)
    if (!user) {
      ctx.helper.error(ctx, -1, '该账户不存在')
    } else {
      ctx.hellp.success(ctx, user)
    }
  }

  async auth () {
    const ctx = this.ctx
    ctx.body = {
      auth: 'ok'
    }
  }
}

module.exports = UserController
