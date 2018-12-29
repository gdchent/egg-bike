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
        res = await ctx.model.Article.getArticlesByTitle({ q: ctx.query.q })
        break
      case 'user':
        res = await ctx.model.User.getUsersByName({ q: ctx.query.q })
        break
    }
    ctx.body = res
  }

  // TODO: 首页文章list, 这样子的话，文章又要联立用户又要联立adata表
}

module.exports = CommonController
