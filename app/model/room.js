module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const Room = app.model.define('room', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    uId: {
      type: INTEGER(11),
      allowNull: false
    },
    oId: {
      type: INTEGER(11),
      allowNull: false
    },
    lastMsgContent: {
      type: STRING,
      allowNull: false
    },
    lastMsgDate: {
      type: DATE,
      allowNull: true
    }
  })

  Room.associate = function () {
    this.belongsTo(app.model.User, { as: 'oUser', foreignKey: 'oId', targertKey: 'Id' })
    this.belongsTo(app.model.User, { as: 'uUser', foreignKey: 'uId', targertKey: 'Id' })
  }

  // FIXME: 麻烦的是last_msg_content怎么做保存
  // 并且第一次创建和接下来的查看，你还要先去做一次查询么
  // 每次点击私信按钮，就要先查询一下之前私信了没，是否创建了room
  // 先伪造一下数据库数据吧，之后再想想create要怎么搞
  Room.createRoom = async function () {

  }

  // 通过我的id去查询rooms，不做分页
  // FIXME: 这里不能单单只通过uId做判断，oId也要进行获取
  // 因为uId本人有room，对方发给我，也会是一个room，这个room里面我是oId
  Room.getRooms = async function (uId) {
    let rooms = await this.findAll({
      where: {
        $or: [
          {
            uId
          },
          {
            oId: uId
          }
        ]
      },
      include: [
        {
          model: app.model.User,
          as: 'uUser',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        },
        {
          model: app.model.User,
          as: 'oUser',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        }
      ],
      order: [
        ['lastMsgDate', 'ASC']
      ]
    })
    return rooms
  }

  return Room
}
