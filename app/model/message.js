module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const Message = app.model.define('message', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    roomId: {
      type: INTEGER(11),
      allowNull: false
    },
    sendId: {
      type: INTEGER(11),
      allowNull: false
    },
    recId: {
      type: INTEGER(11),
      allowNull: false
    },
    content: {
      type: STRING,
      allowNull: false
    },
    date: {
      type: DATE,
      allowNull: true
    },
    status: {
      type: INTEGER(1),
      allowNull: true
    }
  })

  Message.associate = function () {
    this.belongsTo(app.model.User, { as: 'sUser', foreignKey: 'sendId', targertKey: 'Id' })
  }

  Message.getMsgsByRoomId = async function (roomId) {
    console.log(roomId)
    let list = await this.findAll({
      where: {
        roomId
      },
      include: [
        {
          model: app.model.User,
          as: 'sUser',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        }
      ],
      order: [
        ['date', 'ASC']
      ]
    })
    return list
  }

  // FIXME: 要弄两个查询，搞个service
  Message.getMessagesOne = async function (id1, id2) {
    let list = await this.findAll({
      where: {
        sendId: id1,
        recId: id2
      },
      include: [
        {
          model: app.model.User,
          as: 'sUser',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        }
      ]
    })
    return list
  }

  Message.getMessagesTwo = async function (id1, id2) {
    let list = await this.findAll({
      where: {
        sendId: id2,
        recId: id1
      },
      include: [
        {
          model: app.model.User,
          as: 'sUser',
          attributes: {
            exclude: ['password', 'sex', 'introduction', 'blog', 'github', 'wechat']
          }
        }
      ]
    })
    return list
  }

  Message.createMessage = async function (body) {
    let res = await this.create({
      date: new Date(),
      ...body
    })
    return res
  }

  return Message
}
