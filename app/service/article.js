'use strict'

const Service = require('egg').Service

class ArticleService extends Service {
  async createArticle ({ uId, ...body }) {
    let transaction
    try {
      transaction = await this.ctx.model.transaction()
      let article = await this.ctx.model.Article.createArticle({ uId, ...body }, transaction)
      let aId = article.Id
      await this.ctx.model.Adata.create({ aId }, transaction)
      await transaction.commit()
      return true
    } catch (e) {
      await transaction.rollback()
      return false
    }
  }
}

module.exports = ArticleService
