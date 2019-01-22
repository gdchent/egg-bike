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

  // FIXME: 查询指定用户: 仅用于后台查询，毕竟携带了密码
  User.getUserByName = async function (username) {
    let user = await this.findOne({
      where: {
        username
      }
    })
    return user
  }

  // 查询模糊用户 TODO: 改成分页
  User.getUsersByName = async function ({ q }) {
    let reg = q.split('').join('|')

    let users = await this.findAll({
      where: {
        username: {
          [Op.regexp]: reg
        }
      },
      attributes: {
        exclude: ['password']
      }
    })
    return users
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
