module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exchange_profit', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      profit: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('exchange_profit')
  },
}
