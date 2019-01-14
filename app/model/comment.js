module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const Comment = app.model.define('comment', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    aId: {
      type: INTEGER(11),
      allowNull: true
    },
    uId: {
      type: INTEGER(11),
      allowNull: true
    },
    content: {
      type: STRING,
      allowNull: true
    },
    date: {
      type: DATE,
      allowNull: true
    }
  })

  Comment.associate = function () {
    this.belongsTo(app.model.User, { as: 'user', foreignKey: 'uId', targertKey: 'Id' })
    this.hasMany(app.model.Reply, { as: 'reply', foreignKey: 'cId', targetKey: 'Id' })
  }

  // 获取评论
  Comment.getCommentsByAId = async function (aId) {
    let res = await this.findAll({
      where: {
        aId
      },
      include: [
        {
          model: app.model.User,
          as: 'user',
          attributes: {
            exclude: ['password', 'github', 'blog', 'wechat', 'introduction', 'phone']
          }
        },
        {
          model: app.model.Reply,
          as: 'reply',
          include: [
            {
              model: app.model.User,
              as: 'fUser',
              attributes: {
                exclude: ['password', 'github', 'blog', 'wechat', 'introduction', 'phone']
              }
            },
            {
              model: app.model.User,
              as: 'tUser',
              attributes: {
                exclude: ['password', 'github', 'blog', 'wechat', 'introduction', 'phone']
              }
            }
          ]
        }
      ]
    })
    return res
  }

  // 添加评论
  Comment.createComment = async function (body) {
    let res = await this.create(body)
    return res
  }

  return Comment
}
