module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('coins', {
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

            symbol: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            profit: {
                type: Sequelize.DECIMAL,
                defaultValue: 0,
            },

            value: {
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
        return queryInterface.dropTable('coins');
    },
};
