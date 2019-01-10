'use strict'

const Service = require('egg').Service

class LikeService extends Service {
  // 添加like
  async createLike ({ aId, uId }) {
    let transaction
    let { isLike } = await this.ctx.model.Like.isLike({ aId, uId })
    if (isLike) return false
    try {
      transaction = await this.ctx.model.transaction()
      await this.ctx.model.Like.createLike({ aId, uId }, transaction)
      await this.ctx.model.Adata.updateTable({ aId, type: 'like', way: 'up' }, transaction)
      await transaction.commit()
      return true
    } catch (e) {
      await transaction.rollback()
      return false
    }
  }

  // 删除like
  async destroyLike ({ aId, uId }) {
    let transaction
    let { isLike } = await this.ctx.model.Like.isLike({ aId, uId })
    if (!isLike) return false
    try {
      transaction = await this.ctx.model.transaction()
      await this.ctx.model.Like.destroyLike({ aId, uId }, transaction)
      await this.ctx.model.Adata.updateTable({ aId, type: 'like', way: 'down' }, transaction)
      await transaction.commit()
      return true
    } catch (e) {
      await transaction.rollback()
      return false
    }
  }
}

module.exports = LikeService
