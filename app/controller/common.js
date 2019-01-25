'use strict'
// 不知道放那边的controller, 存放公共的

const Controller = require('egg').Controller

class CommonController extends Controller {
  // 模糊搜索
  async search () {
    const ctx = this.ctx
    let type = ctx.query.type || 'article'
    let res

    switch (type) {
      case 'article':
        res = await ctx.model.Article.getArticlesByTitle(ctx.query)
        break
      case 'user':
        res = await ctx.model.User.getUsersByName(ctx.query)
        break
    }
    if (!res) {
      type === 'article' ? ctx.help.error(ctx, -1, '查无该文章')
        : ctx.help.error(ctx, -1, '查无该用户')
    } else {
      ctx.helper.success(ctx, res)
    }
  }
}

module.exports = CommonController
