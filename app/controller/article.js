'use strict'

const Controller = require('egg').Controller

class ArticleController extends Controller {
  async index () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.findAll()
  }

  // FIXME: 了解完传参数和传路径再说啦
  async getArticle () {
    const ctx = this.ctx
    const { id } = ctx.request.body
    let article = await ctx.model.Article.getArticle({ id })
    if (!article) {
      ctx.helper.error(ctx, -1, '该文章不存在')
    } else {
      ctx.helper.success(ctx, article)
    }
  }
}

module.exports = ArticleController
