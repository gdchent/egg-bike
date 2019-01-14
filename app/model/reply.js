module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize

  const Reply = app.model.define('reply', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    cId: {
      type: INTEGER(11),
      allowNull: true
    },
    fromId: {
      type: INTEGER(11),
      allowNull: true
    },
    toId: {
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

  Reply.associate = function () {
    this.belongsTo(app.model.Comment, { as: 'reply', foreignKey: 'cId', targetKey: 'Id' })
    this.belongsTo(app.model.User, { as: 'fUser', foreignKey: 'fromId', targetKey: 'Id' })
    this.belongsTo(app.model.User, { as: 'tUser', foreignKey: 'toId', targetKey: 'Id' })
  }

  Reply.createReply = async function (body) {
    let res = await this.create(body)
    return res
  }

  return Reply
}
