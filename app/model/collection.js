module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Collection = app.model.define('Collection', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    }
  })

  return Collection
}
