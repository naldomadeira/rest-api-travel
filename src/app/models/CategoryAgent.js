import Sequelize, { Model } from 'sequelize'

class CategoryAgent extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        profit: Sequelize.DECIMAL,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'categories_agents',
        modelName: 'CategoryAgent',
      }
    )

    return this
  }

  static associate(models) {
    this.hasMany(models.Agent, {
      foreignKey: 'category_agent_id',
      as: 'agents',
    })
    this.hasMany(models.HotelCategoryProfit, {
      foreignKey: 'category_agent_id',
      as: 'HotelsCategories',
    })
  }
}

export default CategoryAgent
