import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

import Hotel from '../app/models/Hotel'
import Room from '../app/models/Room'

// eslint-disable-next-line no-unused-vars
const models = [Hotel, Room]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
