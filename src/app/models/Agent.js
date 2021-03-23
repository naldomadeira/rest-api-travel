import Sequelize, { Model } from 'sequelize'

class Agent extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        address: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'agents',
        modelName: 'Agent',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.CategoryAgent, {
      foreignKey: 'category_agent_id',
      as: 'category',
    })
    this.hasMany(models.Offer, {
      foreignKey: 'offer_id',
      as: 'offers',
    })
  }
}

export default Agent
