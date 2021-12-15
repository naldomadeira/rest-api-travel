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
                defaultValue: false,
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

            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },

            customer_id: {
                type: Sequelize.INTEGER,
                references: { model: 'customers', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },

            service_id: {
                type: Sequelize.INTEGER,
                references: { model: 'services', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
            },

            agent_id: {
                type: Sequelize.INTEGER,
                references: { model: 'agents', key: 'id' },
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
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('offers');
    },
};
