import Sequelize, { Model } from 'sequelize';

class ExchangeProfit extends Model {
    static init(sequelize) {
        super.init(
            {
                profit: Sequelize.DECIMAL,
                active: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                tableName: 'exchange_profit',
                modelName: 'ExchangeProfit',
            }
        );

        return this;
    }
}

export default ExchangeProfit;
