module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Comment = app.model.define('Comment', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    }
  })

  return Comment
}
