// 构造出info的那一堆数据
'use strict'

const bcrypt = require('bcryptjs')

const Service = require('egg').Service

class UserService extends Service {
  async getMe (token) {

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
