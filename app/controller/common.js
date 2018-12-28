'use strict'
// 不知道放那边的controller, 存放公共的

const Controller = require('egg').Controller

class CommonController extends Controller {
  // 获取到所有用户
  async index () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Common.findAll()
  }

  // 模糊搜索
  async search () {
    const ctx = this.ctx
    let type = ctx.query.type || 'article'
    let res

    switch (type) {
      case 'article':
        res = await ctx.model.Article.getArticlesByTitle({ q: ctx.query.q })
        break
      case 'user':
        res = await ctx.model.User.getUsersByName({ q: ctx.query.q })
        break
    }
    ctx.body = res
  }
}

module.exports = CommonController
