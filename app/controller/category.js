'use strict'

const Controller = require('egg').Controller

class CategoryController extends Controller {
  // 获取到所有分类
  async index () {
    const ctx = this.ctx
    // TODO: 在service里面做数据处理
    ctx.body = await ctx.service.category.generateCategory()
  }

  // 根据分类id获取到对应的文章list，分页
  async getArticlesByCId () {
    const ctx = this.ctx
    let cid = ctx.params.cid
    ctx.body = await ctx.model.Article.getArticlesByCId({
      cid,
      ...ctx.query
    })
  }
}

module.exports = CategoryController
