import CoinBusiness from '../business/CoinBusiness';

class CoinController {
    async index(req, res) {
        // #swagger.tags = ['Coin']
        try {
            const coins = await CoinBusiness.index();

            return res.status(200).json(coins);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['Coin']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Coin. important: euro reference currency",
                schema: { $ref: "#/definitions/Coin" }
    } */
        try {
            const coin = await CoinBusiness.store(req.body);

            return res.status(201).json(coin);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['Coin']

        const { id } = req.params;

        try {
            const coin = await CoinBusiness.show(id);

            return res.status(200).json(coin);
        } catch (err) {
            return res.status(500).send({ message: `Erro retrieving a item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['Coin']
        const { id } = req.params;
        const coinDocument = req.body;

        try {
            const coin = await CoinBusiness.update(id, coinDocument);

            return res.status(200).send(coin);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Coin']

        const { id } = req.params;

        try {
            await CoinBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new CoinController();
