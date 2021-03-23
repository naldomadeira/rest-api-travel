import Sequelize, { Model } from 'sequelize'

class Offer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        paid: Sequelize.BOOLEAN,
        checkin: Sequelize.DATE,
        checkout: Sequelize.DATE,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'offers',
        modelName: 'Offer',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Agent, { foreignKey: 'agent_id', as: 'agent' })
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
    })
    this.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service' })
  }
}

export default Offer
