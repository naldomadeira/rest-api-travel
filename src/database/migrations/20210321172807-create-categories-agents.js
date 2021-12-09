module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories_agents', {
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

            profit: {
                type: Sequelize.DECIMAL,
                defaultValue: 0,
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
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('categories_agents');
    },
};
