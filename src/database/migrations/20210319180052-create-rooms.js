module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
      },

      type: {
        type: Sequelize.ENUM,
        values: ['SGL', 'DBL', 'TLP', 'QDPL'],
        defaultValue: 'SGL',
        allowNull: false,
      },

      hotel_id: {
        type: Sequelize.INTEGER,
        references: { model: 'hotels', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },

      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    return queryInterface.dropTable('rooms')
  },
}
