module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exchanges', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      coin_from: {
        type: Sequelize.INTEGER,
        references: { model: 'coins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      coin_to: {
        type: Sequelize.INTEGER,
        references: { model: 'coins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },

      profit: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
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

  down: (queryInterface) => {
    return queryInterface.dropTable('exchanges')
  },
}
