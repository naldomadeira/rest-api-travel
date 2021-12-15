import Sequelize, { Model } from 'sequelize';

class HotelCategoryProfit extends Model {
    static init(sequelize) {
        super.init(
            {
                profit: Sequelize.DECIMAL,
            },
            {
                sequelize,
                tableName: 'hotels_categories_profit',
                modelName: 'HotelCategoryProfit',
            }
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Hotel, { foreignKey: 'hotel_id', as: 'hotel' });
        this.belongsTo(models.CategoryAgent, {
            foreignKey: 'category_agent_id',
            as: 'CategoryAgent',
        });
    }
}

export default HotelCategoryProfit;
