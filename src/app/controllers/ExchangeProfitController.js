import ExchangeProfitBusiness from '../business/ExchangeProfitBusiness';
class ExchangeProfitController {
    async store(req, res, next) {
        // #swagger.tags = ['ExchangeProfit']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Exchance Profit.",
                schema: { $ref: "#/definitions/ExchangeProfit" }
        } */

        try {
            const exchangeProfit = await ExchangeProfitBusiness.store(req.body);

            return res.status(201).json(exchangeProfit);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['ExchangeProfit']

        const { id } = req.params;

        try {
            const exchangeProfit = await ExchangeProfitBusiness.show(id);

            return res.status(200).json(exchangeProfit);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['ExchangeProfit']

        const { id } = req.params;
        const exchangeProfitDocument = req.body;

        try {
            const exchangeProfit = await ExchangeProfitBusiness.update(
                id,
                exchangeProfitDocument
            );

            return res.status(200).send(exchangeProfit);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['ExchangeProfit']

        const { id } = req.params;

        try {
            await ExchangeProfitBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new ExchangeProfitController();
