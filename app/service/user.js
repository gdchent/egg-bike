// 构造出info的那一堆数据
'use strict'

const bcrypt = require('bcryptjs')

const Service = require('egg').Service

class UserService extends Service {
  async getMe (token) {

  }

  async getUserById (id) {
    let user = await this.ctx.model.User.getUserById(id)
    let data = {}
    // FIXME: 其实这几个可以同时promise.all的
    if (user) {
      data.followingCount = await this.ctx.model.Follow.count({
        where: {
          uId: id
        }
      })
      data.followerCount = await this.ctx.model.Follow.count({
        where: {
          fId: id
        }
      })
      data.articleCount = await this.ctx.model.Article.count({
        where: {
          userId: id
        }
      })
      // FIXME: 啊，我想获取的是文章所获得的的喜欢数呀
      // 先搜索到所有文章，再加？
      data.likeCount = await this.ctx.model.Like.count({
        where: {
          uId: id
        }
      })
    }
    return {
      ...user.dataValues,
      ...data
    }
  }

  // 加密密码（注册用）
  async encrypt (psd) {
    // 生成salt的迭代次数
    const saltRounds = 10
    // 随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds)
    // 获取hash值
    const hash = bcrypt.hashSync(psd, salt)

    return hash
  }
}

module.exports = UserService
