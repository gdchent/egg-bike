'use strict'

const Service = require('egg').Service

class TokenService extends Service {
  /**
   * 生成 Token
   * @param {Object} data
   */
  async createToken (data) {
    return this.app.jwt.sign(data, this.config.jwt.secret, {
      expiresIn: '12h'
    })
  }

  /**
   * 验证token的合法性
   * @param {String} token
   */
  async verifyToken (token) {
    return new Promise((resolve, reject) => {
      this.app.jwt.verify(token, this.config.jwt.secret, function (err, decoded) {
        let result = {}
        if (err) {
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
          result.verify = false
          result.message = err.message
        } else {
          result.verify = true
          result.message = decoded
        }
        resolve(result)
      })
    })
  }

  // 解析token
  async decodeToken (token) {
    if (token !== '') {
      // 去掉 Bearer
      token = token.split(' ')[1]
    }
    return this.app.jwt.decode(token)
  }
}

module.exports = TokenService
