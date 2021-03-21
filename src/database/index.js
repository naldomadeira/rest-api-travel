import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

import Hotel from '../app/models/Hotel'
import Room from '../app/models/Room'
import Coin from '../app/models/Coin'
import Service from '../app/models/Service'
import CategoryAgent from '../app/models/CategoryAgent'
import Agent from '../app/models/Agent'
import Customer from '../app/models/Customer'
import HotelCategoryProfit from '../app/models/HotelCategoryProfit'

const models = [
  Hotel,
  Room,
  Coin,
  Service,
  CategoryAgent,
  Agent,
  Customer,
  HotelCategoryProfit,
]

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
