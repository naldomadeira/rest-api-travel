module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hotels_categories_profit', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      profit: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },

      hotel_id: {
        type: Sequelize.INTEGER,
        references: { model: 'hotels', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      category_agent_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categories_agents', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('hotels_categories_profit')
  },
}
