import Exchange from '../models/Exchange';
import { NotFound } from '../../errors';
import Coin from '../models/Coin';
import Customer from '../models/Customer';

const relationships = {
    attributes: ['id', 'amount_from', 'amount_total'],
    include: [
        {
            model: Coin,
            as: 'coin_from',
            attributes: ['id', 'name'],
        },
        {
            model: Coin,
            as: 'coin_to',
            attributes: ['id', 'name'],
        },
        {
            model: Customer,
            as: 'customer_id',
            attributes: ['id', 'name'],
        },
    ],
};

class ExchangeBusiness {
    index() {
        return Exchange.findAll(relationships);
    }

    store(exchangeDocument) {
        return Exchange.create(exchangeDocument);
    }

    async show(exchangeId) {
        const exchangeSearched = await this.findOrFail(
            exchangeId,
            relationships
        );

        return exchangeSearched;
    }

    async update(exchangeId, exchangeDocument) {
        const exchangeSearched = await this.findOrFail(exchangeId);

        return exchangeSearched.update(exchangeDocument);
    }

    async destroy(exchangeId) {
        const exchangeSearched = await this.findOrFail(exchangeId);

        await exchangeSearched.destroy();
    }

    async findOrFail(exchangeId, relationships = null) {
        const exchangeSearched = await Exchange.findByPk(
            exchangeId,
            relationships
        );

        if (exchangeSearched) {
            return exchangeSearched;
        }

        throw new NotFound(`exchange doesn't exist`);
    }
}

export default new ExchangeBusiness();
