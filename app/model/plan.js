module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize

  const Plan = app.model.define('plan', {
    Id: {
      type: INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    uId: {
      type: INTEGER(11),
      allowNull: false
    },
    start: {
      type: STRING,
      allowNull: false
    },
    end: {
      type: STRING,
      allowNull: false
    },
    startTime: {
      type: DATE,
      allowNull: false
    },
    endTime: {
      type: DATE,
      allowNull: false
    },
    time: {
      type: INTEGER(11),
      allowNull: true
    },
    distance: {
      type: INTEGER(11),
      allowNull: true
    },
    isMsg: {
      type: INTEGER(1),
      allowNull: true
    },
    status: {
      type: INTEGER(1),
      allowNull: true
    }
  })

  Plan.getPlans = async function (uId) {
    let plans = await this.findAll({
      where: {
        uId
      },
      order: [
        ['startTime', 'DESC']
      ]
    })
    return plans
  }

  return Plan
}
