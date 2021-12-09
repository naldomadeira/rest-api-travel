module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('hotels', {
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

            country: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            details: {
                type: Sequelize.STRING,
            },

            address: {
                type: Sequelize.STRING,
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

    down: (queryInterface) => {
        return queryInterface.dropTable('hotels');
    },
};
