import Sequelize, { Model } from 'sequelize'

class Coin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        symbol: Sequelize.STRING,
        profit: Sequelize.DECIMAL,
        value: Sequelize.DECIMAL,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'coins',
        modelName: 'Coin',
      }
    )

    return this
  }

  static associate(models) {
    this.hasMany(models.Service, {
      foreignKey: 'coin_id',
      as: 'services',
    })

    this.hasMany(models.Customer, {
      foreignKey: 'coin_id',
      as: 'customers',
    })
  }
}

export default Coin
