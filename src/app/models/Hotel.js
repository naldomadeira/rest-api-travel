import Sequelize, { Model } from 'sequelize';

class Hotel extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                country: Sequelize.STRING,
                details: Sequelize.STRING,
                address: Sequelize.STRING,
                active: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                tableName: 'hotels',
                modelName: 'Hotel',
            }
        );

        return this;
    }

    static associate(models) {
        this.hasMany(models.Room, {
            foreignKey: 'hotel_id',
            as: 'rooms',
        });
        this.hasMany(models.Service, {
            foreignKey: 'hotel_id',
            as: 'services',
        });
        this.hasMany(models.HotelCategoryProfit, {
            foreignKey: 'hotel_id',
            as: 'HotelsCategories',
        });
    }
}

export default Hotel;
