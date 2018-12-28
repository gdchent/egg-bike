module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Support = app.model.define('Support', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    }
  })

  return Support
}
