'use strict'

const Controller = require('egg').Controller

class AdminController extends Controller {
  async index () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Admin.findAll()
  }

  async login () {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    let user = await ctx.model.User.find({ username })
    if (password !== user.password) {
      ctx.helper.error(ctx, -1, '密码错误')
    } else {
      let token = await ctx.service.token.createToken({ role: 'admin', id: user.Id })
      ctx.helper.success(ctx, { token })
    }
  }

  async auth () {
    const ctx = this.ctx
    ctx.body = {
      auth: 'ok'
    }
  }
}

module.exports = AdminController
