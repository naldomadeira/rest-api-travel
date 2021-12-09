import ExchangeProfitBusiness from '../business/ExchangeProfitBusiness';
class ExchangeProfitController {
    async store(req, res) {
        // #swagger.tags = ['ExchangeProfit']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Exchance Profit.",
                schema: { $ref: "#/definitions/ExchangeProfit" }
        } */

        try {
            const exchangeProfit = await ExchangeProfitBusiness.store(req.body);

            return res.status(201).json(exchangeProfit);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['ExchangeProfit']

        const { id } = req.params;

        try {
            const exchangeProfit = await ExchangeProfitBusiness.show(id);

            return res.status(200).json(exchangeProfit);
        } catch (err) {
            return res.status(500).send({ message: `Erro retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['ExchangeProfit']

        const { id } = req.params;
        const exchangeProfitDocument = req.body;

        try {
            const exchangeProfit = await ExchangeProfitBusiness.update(
                id,
                exchangeProfitDocument
            );

            return res.status(200).send(exchangeProfit);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['ExchangeProfit']

        const { id } = req.params;

        try {
            await ExchangeProfitBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new ExchangeProfitController();
