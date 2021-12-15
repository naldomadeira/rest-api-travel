import ExchangeBusiness from '../business/ExchangeBusiness';

class ExchangeController {
    async index(req, res, next) {
        // #swagger.tags = ['Exchange']

        try {
            const exchanges = await ExchangeBusiness.index();

            return res.status(200).json(exchanges);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Exchange']

        const { id } = req.params;

        try {
            await ExchangeBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new ExchangeController();
