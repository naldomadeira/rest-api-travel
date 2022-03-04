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
            },

            hotel_id: {
                type: Sequelize.INTEGER,
                references: { model: 'hotels', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false,
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
        return queryInterface.dropTable('rooms');
    },
};
