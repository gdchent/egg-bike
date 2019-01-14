module.exports = app => {
  const { INTEGER } = app.Sequelize

  const Plan = app.model.define('plan', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    }
  })

  return Plan
}
