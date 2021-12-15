import ExchangeProfit from '../models/ExchangeProfit';
import { NotFound } from '../../errors';

const relationships = {
    attributes: ['id', 'profit', 'active'],
};

class ExchangeProfitBusiness {
    index() {
        return ExchangeProfit.findAll(relationships);
    }

    store(exchangeProfitDocument) {
        return ExchangeProfit.create(exchangeProfitDocument);
    }

    async show(exchangeProfitId) {
        const exchangeSearched = await this.findOrFail(
            exchangeProfitId,
            relationships
        );

        return exchangeSearched;
    }

    async update(exchangeProfitId, exchangeProfitDocument) {
        const exchangeSearched = await this.findOrFail(exchangeProfitId);

        return exchangeSearched.update(exchangeProfitDocument);
    }

    async destroy(exchangeProfitId) {
        const exchangeSearched = await this.findOrFail(exchangeProfitId);

        await exchangeSearched.destroy();
    }

    async findOrFail(exchangeProfitId, relationships = null) {
        const exchangeSearched = await ExchangeProfit.findByPk(
            exchangeProfitId,
            relationships
        );

        if (exchangeSearched) {
            return exchangeSearched;
        }

        throw new NotFound(`exchange profit doesn't exist`);
    }

    findWhere(where) {
        return ExchangeProfit.findOne({
            where,
        });
    }
}

export default new ExchangeProfitBusiness();
