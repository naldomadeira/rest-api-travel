import Sequelize, { Model } from 'sequelize'

class Room extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,

        type: Sequelize.ENUM,

        hotel_id: Sequelize.INTEGER,

        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,

        modelName: 'Room',
      }
    )
  }

  static association(models) {
    this.belongsTo(models.Hotel, { foreignKey: 'hotel_id', as: 'hotel' })
  }
}

export default Room
