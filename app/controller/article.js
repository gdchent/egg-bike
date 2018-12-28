'use strict'

const Controller = require('egg').Controller

class ArticleController extends Controller {
  // 查找所有文章
  async index () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.findAll()
  }

  // 根据id查找一篇文章 改成 根据文章名模糊搜索文章
  async show () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.getArticle({ id: ctx.params.id })
  }

  // TODO: 根据文章名模糊搜索文章
  async findArticleByTitle () {
    const ctx = this.ctx
    console.log(ctx.query)
    ctx.body = await ctx.model.Article.getArticleByTitle({ q: ctx.query.q })
  }

  // 增加一篇文章
  async create () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.createArticle(ctx.request.body)
  }

  // 删除一篇文章（文章必须为作者所有才可删）
  async destroy () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.destroyArticle({ id: ctx.params.id })
  }

  // 修改一篇文章, 不给修改功能吧，考虑下
  async update () {}

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