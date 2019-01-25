module.exports = app => {
  const { STRING, INTEGER, Op } = app.Sequelize

  const User = app.model.define('user', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING,
      allowNull: true
    },
    password: {
      type: STRING,
      allowNull: true
    },
    avatar: {
      type: STRING,
      allowNull: true
    },
    sex: {
      type: INTEGER(1),
      allowNull: true
    },
    introduction: {
      type: STRING,
      allowNull: true
    },
    blog: {
      type: STRING,
      allowNull: true
    },
    github: {
      type: STRING,
      allowNull: true
    },
    wechat: {
      type: STRING,
      allowNull: true
    },
    phone: {
      type: STRING,
      allowNull: true
    }
  })

  User.associate = function () {
    this.hasMany(app.model.Article, { foreignKey: 'userId', targetKey: 'Id' })
    this.hasMany(app.model.Comment, { as: 'user', foreignKey: 'uId', targetKey: 'Id' })
    this.hasMany(app.model.Reply, { as: 'fUser', foreignKey: 'fromId', targetKey: 'Id' })
    this.hasMany(app.model.Reply, { as: 'tUser', foreignKey: 'toId', targetKey: 'Id' })
    this.hasMany(app.model.Follow, { as: 'fInfo', foreignKey: 'fId', targetKey: 'Id' })
    this.hasMany(app.model.Follow, { as: 'uInfo', foreignKey: 'uId', targetKey: 'Id' })
  }

  // 查询指定用户
  User.getUserById = async function (id) {
    let user = await this.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['password']
      }
    })

    return user
  }

  // login查询指定用户: 仅用于后台查询，毕竟携带了密码
  User.getUserByName = async function (username) {
    let user = await this.findOne({
      where: {
        username
      }
    })
    return user
  }

  User.getUsersByName = async function ({ q, current = 1, size = 5 }) {
    // 因为数字的q被我的中间件转化成了数字，导致下面使用trim()报错
    q = String(q)
    let reg = q.trim().split('').join('|')
    let offset = (current - 1) * size
    let total = await this.count({
      where: {
        username: {
          [Op.regexp]: reg
        }
      }
    })
    let users = await this.findAll({
      limit: size,
      offset,
      where: {
        username: {
          [Op.regexp]: reg
        }
      },
      attributes: {
        exclude: ['password', 'blog', 'wechat', 'github']
      }
    })
    return {
      list: users,
      total,
      current,
      size
    }
  }

  // 更新个人资料
  User.updateMyInfo = async function (Id, body) {
    let res = await this.update({
      ...body
    }, {
      where: {
        Id
      }
    })
    return res
  }

  return User
}
