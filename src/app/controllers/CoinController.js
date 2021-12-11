import CoinBusiness from '../business/CoinBusiness';

class CoinController {
    async index(req, res, next) {
        // #swagger.tags = ['Coin']
        try {
            const coins = await CoinBusiness.index();

            return res.status(200).json(coins);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['Coin']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Coin. important: euro reference currency",
                schema: { $ref: "#/definitions/Coin" }
    } */
        try {
            const coin = await CoinBusiness.store(req.body);

            return res.status(201).json(coin);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['Coin']

        const { id } = req.params;

        try {
            const coin = await CoinBusiness.show(id);

            return res.status(200).json(coin);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['Coin']
        const { id } = req.params;
        const coinDocument = req.body;

        try {
            const coin = await CoinBusiness.update(id, coinDocument);

            return res.status(200).send(coin);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Coin']

        const { id } = req.params;

        try {
            await CoinBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new CoinController();
