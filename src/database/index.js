import Sequelize from 'sequelize';
import environment from '../config/environment';

import Hotel from '../app/models/Hotel';
import Room from '../app/models/Room';
import Coin from '../app/models/Coin';
import Service from '../app/models/Service';
import CategoryAgent from '../app/models/CategoryAgent';
import Agent from '../app/models/Agent';
import Customer from '../app/models/Customer';
import HotelCategoryProfit from '../app/models/HotelCategoryProfit';
import Exchange from '../app/models/Exchange';
import Offer from '../app/models/Offer';
import ExchangeProfit from '../app/models/ExchangeProfit';

const models = [
    Hotel,
    ExchangeProfit,
    Room,
    Coin,
    Service,
    CategoryAgent,
    Agent,
    Customer,
    HotelCategoryProfit,
    Exchange,
    Offer,
];

class Database {
    init() {
        this.connection = new Sequelize(environment.db);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
