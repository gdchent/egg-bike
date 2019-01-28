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

  return Message
}
