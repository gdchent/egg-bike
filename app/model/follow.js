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

  // 我关注数
  Follow.getFollowingCountByUId = async function (uId) {
    // FIXME: 牛逼，有直接提供的count方法
    let res = await this.count({
      where: {
        uId
      }
    })
    return res
  }

  // 被关注数
  Follow.getFollowerCountByFId = async function (fId) {
    let res = await this.count({
      where: {
        fId
      }
    })
    return res
  }

  // 我关注的人
  Follow.getFollowingsByUId = async function (uId) {
    let follows = await this.findAll({
      where: {
        uId
      },
      include: [
        {
          model: app.model.User,
          as: 'fInfo',
          attributes: {
            exclude: ['password']
          }
        }
      ],
      attributes: {
        exclude: ['Id', 'uId', 'fId']
      }
    })
    return follows
  }

  // 我的粉丝
  Follow.getFollowersByFId = async function (fId) {
    let follows = await this.findAll({
      where: {
        fId
      },
      include: [
        {
          model: app.model.User,
          as: 'uInfo',
          attributes: {
            exclude: ['password']
          }
        }
      ],
      attributes: {
        exclude: ['Id', 'uId', 'fId']
      }
    })
    return follows
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
