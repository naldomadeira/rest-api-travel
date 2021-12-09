import Sequelize, { Model } from 'sequelize';

class Exchange extends Model {
    static init(sequelize) {
        super.init(
            {
                amount_from: Sequelize.DECIMAL,
                amount_total: Sequelize.DECIMAL,
            },
            {
                sequelize,
                tableName: 'exchanges',
                modelName: 'Exchange',
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Coin, {
            foreignKey: 'coin_from',
            as: 'coinFrom',
        });
        this.belongsTo(models.Coin, { foreignKey: 'coin_to', as: 'coinTo' });
        this.belongsTo(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer',
        });
    }
}

export default Exchange;
