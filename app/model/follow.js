module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Follow = app.model.define('Follow', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    }
  })

  return Follow
}
