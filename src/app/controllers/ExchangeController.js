import ExchangeBusiness from '../business/ExchangeBusiness';

class ExchangeController {
    async index(req, res) {
        // #swagger.tags = ['Exchange']

        try {
            const exchanges = await ExchangeBusiness.index();

            return res.status(200).json(exchanges);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Exchange']

        const { id } = req.params;

        try {
            await ExchangeBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new ExchangeController();
