import Sequelize, { Model } from 'sequelize'

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        address: Sequelize.STRING,
        phone: Sequelize.STRING,
        country: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'customers',
        modelName: 'Customer',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Coin, {
      foreignKey: 'coin_id',
      as: 'coin',
    })
    this.hasMany(models.Offer, {
      foreignKey: 'customer_id',
      as: 'offers',
    })
  }
}

export default Customer
