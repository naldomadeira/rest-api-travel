import Sequelize, { Model } from 'sequelize'

class Exchange extends Model {
  static init(sequelize) {
    super.init(
      {
        profit: Sequelize.DECIMAL,
      },
      {
        sequelize,
        tableName: 'exchanges',
        modelName: 'Exchange',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Coin, { foreignKey: 'coin_from', as: 'coinFrom' })
    this.belongsTo(models.Coin, { foreignKey: 'coin_to', as: 'coinTo' })
  }
}

export default Exchange
