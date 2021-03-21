import Sequelize, { Model } from 'sequelize'

class Hotel extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        country: Sequelize.STRING,
        details: Sequelize.STRING,
        address: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'hotels',
        modelName: 'Hotel',
      }
    )

    return this
  }

  static associate(models) {
    Hotel.hasMany(models.Room, {
      foreignKey: 'hotel_id',
      as: 'rooms',
    })
  }
}

export default Hotel
