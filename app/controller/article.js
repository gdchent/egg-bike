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
    let res = await ctx.model.Article.getArticleById({ id: ctx.params.id })
    if (!res) {
      ctx.helper.error(ctx, -1, '该文章不存在')
    } else {
      ctx.helper.success(ctx, res)
      // 将view + 1, 放下面不阻塞
      ctx.model.Article.updateView(res.Id, res.view + 1)
    }
  }

  // TODO: 根据文章名模糊搜索文章
  async getArticlesByTitle () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.getArticlesByTitle({ q: ctx.query.q })
  }

  // 最新文章
  async getArticlesByTime () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.getArticlesByTime(ctx.query)
  }

  // 最火文章
  async getArticlesByView () {
    const ctx = this.ctx
    ctx.body = await ctx.model.Article.getArticlesByView(ctx.query)
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

  /**
   * 文章评论
  */
  // 获取评论
  async getCommentsByAId () {
    const ctx = this.ctx
    let aId = ctx.params.aId
    let res = await ctx.model.Comment.getCommentsByAId(aId)
    ctx.helper.success(ctx, res)
  }

  // 添加一条评论
  async createComment () {
    const ctx = this.ctx
    let aId = ctx.params.aId
    let token = await ctx.helper.parseToken(ctx)
    let uId = token.id
    let res = await ctx.model.Comment.create({ aId, uId, ...ctx.request.body })
    ctx.helper.success(ctx, res)
  }

  // 添加一条回复
  async createReply () {
    const ctx = this.ctx
    let cId = ctx.params.cId
    let res = await ctx.model.Reply.createReply({ cId, ...ctx.request.body })
    ctx.helper.success(ctx, res)
  }

  // FIXME: 删除评论（看情况做不做吧）
  async destroyComment () {

  }
}

module.exports = ArticleController
