import Sequelize, { Model } from 'sequelize'

class Coin extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        symbol: Sequelize.STRING,
        profit: Sequelize.DECIMAL,
        value: Sequelize.DECIMAL,
      },
      {
        sequelize,
        tableName: 'coins',
        modelName: 'Coin',
      }
    )

    return this
  }

  //static associate(models) {}
}

export default Coin
