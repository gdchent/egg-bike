'use strict'

const Controller = require('egg').Controller

class CategoryController extends Controller {
  // 获取到所有分类
  async index () {
    const ctx = this.ctx
    let res = await ctx.service.category.generateCategory()
    if (!res) {
      ctx.helper.error(ctx, -1, '应该是后台出问题了')
    } else {
      ctx.helper.success(ctx, res)
    }
  }

  // 根据分类id获取到对应的文章list，分页
  async getArticlesByCId () {
    const ctx = this.ctx
    let cid = ctx.params.cId
    let res = await ctx.model.Article.getArticlesByCId({
      cid,
      ...ctx.query
    })
    if (!res) {
      ctx.helper.error(ctx, -1, '查询失败')
    } else {
      ctx.helper.success(ctx, res)
    }
  }
}

module.exports = CategoryController
