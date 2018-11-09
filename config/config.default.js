'use strict'

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_cheese'

  // add your config here
  config.middleware = []

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
  config.jwt = {
    enable: true,
    secret: 'cheesekun',
    ignore: '/login'
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

  return config
}
