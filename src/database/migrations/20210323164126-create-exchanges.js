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

            customer_id: {
                type: Sequelize.INTEGER,
                references: { model: 'customers', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
            },

            amount_from: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },

            amount_total: {
                type: Sequelize.DECIMAL,
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
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('exchanges');
    },
};
