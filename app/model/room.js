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
    this.belongsTo(app.model.User, { as: 'user', foreignKey: 'uId', targertKey: 'Id' })
  }

  return Room
}
