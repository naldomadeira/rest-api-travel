module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('services', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },

            price: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },

            hotel_id: {
                type: Sequelize.INTEGER,
                references: { model: 'hotels', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },

            room_id: {
                type: Sequelize.INTEGER,
                references: { model: 'rooms', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },

            coin_id: {
                type: Sequelize.INTEGER,
                references: { model: 'coins', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: new Date(),
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('services');
    },
};
