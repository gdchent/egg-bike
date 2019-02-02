module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize

  const Like = app.model.define('like', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    aId: {
      type: INTEGER(11),
      allowNull: false
    },
    uId: {
      type: INTEGER(11),
      allowNull: false
    },
    time: {
      type: DATE,
      allowNull: false
    }
  })

  Like.associate = function () {
    this.hasOne(app.model.Article, { as: 'article', foreignKey: 'Id' })
  }

  // 添加喜欢(不需要判断是否已喜欢，原子化)
  Like.createLike = async function (body) {
    let res = await this.create(body)
    return res
  }

  // 删除喜欢
  Like.destroyLike = async function (body) {
    let res = await this.destroy({
      where: body
    })
    return res
  }

  // 查询是否已喜欢过该文章
  Like.isLike = async function ({ aId, uId }) {
    let isLike = false
    let res = await this.findOne({
      where: {
        aId,
        uId
      }
    })
    if (res) isLike = true
    return { isLike }
  }

  // 获取用户喜欢列表, 不分页
  Like.getLikeList = async function (uId) {
    let likes = await this.findAll({
      where: {
        uId
      },
      attributes: {
        exclude: ['aId', 'uId']
      },
      include: [
        {
          model: app.model.Article,
          as: 'article',
          attributes: {
            exclude: ['content', 'userId']
          },
          include: [
            {
              model: app.model.Adata,
              as: 'gather',
              attributes: {
                exclude: ['Id', 'aId']
              }
            },
            {
              model: app.model.User,
              as: 'author',
              attributes: {
                exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
              }
            }
          ]
        }
      ],
      order: [
        ['time', 'DESC']
      ]
    })

    return likes
  }

  return Like
}
