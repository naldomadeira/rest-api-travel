'use strict';

module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'coins',
            [
                {
                    name: 'Euro',
                    symbol: 'EUR',
                    profit: 0,
                    value: 1,
                    active: true,
                },
                {
                    name: 'Dollar',
                    symbol: 'USD',
                    profit: 0,
                    value: 1,
                    active: true,
                },
                {
                    name: 'Real',
                    symbol: 'BRL',
                    profit: 0,
                    value: 1,
                    active: true,
                },
            ],
            {}
        );
    },

    // eslint-disable-next-line no-unused-vars
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('coins', null, {});
    },
};
