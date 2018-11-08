'use strict';

const Controller = require('egg').Controller

class UserController extends Controller {
  async index () {
    const ctx = this.ctx
    ctx.body = await ctx.model.User.findAll()
  }
}

module.exports = UserController
