module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('customers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      surname: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING,
      },

      phone: {
        type: Sequelize.STRING,
      },

      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      coin_id: {
        type: Sequelize.INTEGER,
        references: { model: 'coins', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
    return queryInterface.dropTable('customers')
  },
}
