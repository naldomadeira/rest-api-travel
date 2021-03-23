module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('offers', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
      },

      paid: {
        type: Sequelize.BOOLEAN,
        default: false,
      },

      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },

      checkin: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      checkout: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },

      service_id: {
        type: Sequelize.INTEGER,
        references: { model: 'services', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },

      agent_id: {
        type: Sequelize.INTEGER,
        references: { model: 'agents', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

  down: (queryInterface) => {
    return queryInterface.dropTable('offers')
  },
}
