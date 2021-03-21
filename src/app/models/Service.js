import Sequelize, { Model } from 'sequelize'

class Service extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
        tableName: 'services',
        modelName: 'Service',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Hotel, { foreignKey: 'hotel_id', as: 'hotel' })
    this.belongsTo(models.Room, { foreignKey: 'room_id', as: 'room' })
    this.belongsTo(models.Coin, { foreignKey: 'coin_id', as: 'coin' })
  }
}

export default Service
