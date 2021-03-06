'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_cheese'

  // add your config here
  config.middleware = ['qs']

  // sequelize
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'egg-bike',
    username: 'root',
    password: '123456',
    define: {
      timestamps: false
    }
  }

  // jwt
  // 暂时性不拦截路由
  const arr = ['/upload', '/like', '/comment', '/chat']
  config.jwt = {
    enable: true,
    secret: 'cheesekun',
    ignore: ['/login', '/register', '/user', '/article', '/admin/login', '/category', '/search', ...arr]
  }

  // web csrf 安全配置
  config.security = {
    xframe: {
      enable: false
    },
    csrf: {
      enable: false
    }
  }

  // socket.io 配置
  config.io = {
    init: { }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [
          'connection'
        ],
        packetMiddleware: []
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: []
      }
    }
  }

  // 错误处理
  config.onerror = {
    all (err, ctx) {
      ctx.status = err.status
      // ctx.body = JSON.stringify(err)
      switch (err.status) {
        case 401:
          ctx.body = JSON.stringify({
            code: -2,
            msg: err.message
          })
          break
        case 500:
          ctx.body = JSON.stringify({
            code: -1,
            msg: err.message
          })
          break
      }
    }
  }

  // 默认code
  config.code = {
    success: 1,
    fail: 0,
    error: -1
  }

  return config
}
