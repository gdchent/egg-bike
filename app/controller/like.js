'use strict'

const Controller = require('egg').Controller

class LikeController extends Controller {
  async isLike () {
    const ctx = this.ctx
    let res = await ctx.model.Like.isLike(ctx.query)
    ctx.helper.success(ctx, res)
  }

  async createLike () {
    const ctx = this.ctx
    let res = await ctx.service.like.createLike(ctx.request.body)
    if (!res) {
      ctx.helper.error(ctx, -1, '请勿重复点赞')
    } else {
      ctx.helper.success(ctx, res)
    }
  }

  async destroyLike () {
    const ctx = this.ctx
    let res = await ctx.service.like.destroyLike(ctx.request.body)
    if (!res) {
      ctx.helper.error(ctx, -1, '此条like记录不存在')
    } else {
      ctx.helper.success(ctx, res)
    }
  }
}

module.exports = LikeController
