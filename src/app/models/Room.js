import Sequelize, { Model } from 'sequelize'

class Room extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        type: Sequelize.ENUM('SGL', 'DBL', 'TLP', 'QDPL'),
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'rooms',
        modelName: 'Room',
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Hotel, { foreignKey: 'hotel_id', as: 'hotel' })
    this.hasMany(models.Service, {
      foreignKey: 'room_id',
      as: 'services',
    })
  }
}

export default Room
