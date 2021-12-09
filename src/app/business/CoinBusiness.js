import Coin from '../models/Coin';
import Customer from '../models/Customer';
import { NotFound } from '../../errors';

class CoinBusiness {
    constructor() {
        this.relationships = {
            attributes: ['id', 'name', 'symbol', 'profit', 'value', 'active'],
            include: {
                model: Customer,
                as: 'customers',
                attributes: ['id', 'name'],
            },
        };
    }

    index() {
        return Coin.findAll(this.relationships);
    }

    store(coinDocument) {
        return Coin.create(coinDocument);
    }

    async show(coinId) {
        const coinSearched = await this.findOrFail(coinId, this.relationships);

        return coinSearched;
    }

    async update(coinId, coinDocument) {
        const coinSearched = await this.findOrFail(coinId);

        return coinSearched.update(coinDocument);
    }

    async destroy(coinId) {
        const coinSearched = await this.findOrFail(coinId);

        await coinSearched.destroy();
    }

    async findOrFail(coinId, relationships = null) {
        const coinSearched = await Coin.findByPk(coinId, relationships);

        if (coinSearched) {
            return coinSearched;
        }

        throw new NotFound(`coin doesn't exist`);
    }

    getRelationships() {
        return this.relationships;
    }
}

export default new CoinBusiness();
