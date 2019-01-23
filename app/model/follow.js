module.exports = app => {
  const { INTEGER, fn, col } = app.Sequelize

  const Follow = app.model.define('follow', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    uId: {
      type: INTEGER(11),
      allowNull: false
    },
    fId: {
      type: INTEGER(11),
      allowNull: false
    }
  })

  Follow.associate = function () {
    this.belongsTo(app.model.User, { as: 'fInfo', foreignKey: 'fId', targetKey: 'Id' })
    this.belongsTo(app.model.User, { as: 'uInfo', foreignKey: 'uId', targetKey: 'Id' })
  }

  // 我关注的人
  Follow.getFollowingsByUId = async function (uId, current = 1, size = 8) {
    let offset = (current - 1) * size
    let total = await app.model.Follow.count({
      where: {
        uId
      }
    })
    let followings = await this.findAll({
      linit: size,
      offset,
      where: {
        uId
      },
      include: [
        {
          model: app.model.User,
          as: 'fInfo',
          attributes: {
            exclude: ['password', 'blog', 'github', 'wechat', 'phone']
          }
        }
      ],
      attributes: {
        exclude: ['Id', 'uId', 'fId']
      }
    })
    return {
      list: followings,
      total,
      current,
      size
    }
  }

  // 我的粉丝
  Follow.getFollowersByFId = async function (fId, current = 1, size = 8) {
    let offset = (current - 1) * size
    let total = await app.model.Follow.count({
      where: {
        fId
      }
    })
    let followers = await this.findAll({
      limit: size,
      offset,
      where: {
        fId
      },
      include: [
        {
          model: app.model.User,
          as: 'uInfo',
          attributes: {
            exclude: ['password', 'blog', 'github', 'wechat', 'phone']
          }
        }
      ],
      attributes: {
        exclude: ['Id', 'uId', 'fId']
      }
    })
    return {
      list: followers,
      total,
      current,
      size
    }
  }

  // 是否已关注
  Follow.isFollow = async function ({ uId, fId }) {
    let res = await this.findOne({
      where: {
        uId,
        fId
      }
    })
    return res
  }

  // 进行关注
  Follow.createFollow = async function ({ uId, fId }) {
    // FIXME: 本来应该先看一下有没有存在这个uId和fId的
    let res = await this.create({
      uId,
      fId
    })
    return res
  }

  // 取消关注
  Follow.destroyFollow = async function ({ uId, fId }) {
    // FIXME: 本来应该先看一下有没有存在这个uId和fId的
    let res = await this.destroy({
      where: {
        uId,
        fId
      }
    })
    return res
  }

  return Follow
}
