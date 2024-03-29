module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('agents', {
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

            address: {
                type: Sequelize.STRING,
            },

            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },

            category_agent_id: {
                type: Sequelize.INTEGER,
                references: { model: 'categories_agents', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
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
        return queryInterface.dropTable('agents');
    },
};
