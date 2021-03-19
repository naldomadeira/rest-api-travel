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

        modelName: 'Hotel',
      }
    )
  }
}

export default Hotel
