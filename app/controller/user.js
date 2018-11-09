'use strict'

const Controller = require('egg').Controller

class UserController extends Controller {
  async index () {
    const ctx = this.ctx
    ctx.body = await ctx.model.User.findAll()
  }

  async login () {
    const ctx = this.ctx
    const { username, password } = ctx.request.body
    let token = await ctx.service.token.createToken({ username })
    ctx.body = {
      token
    }
  }
}

module.exports = UserController
