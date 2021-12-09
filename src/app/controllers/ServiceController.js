import ServiceBusiness from '../business/ServiceBusiness';

class ServiceController {
    async index(req, res) {
        // #swagger.tags = ['Service']

        try {
            const services = await ServiceBusiness.index();

            return res.status(200).json(services);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['Service']
        /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Service.",
                schema: { $ref: "#/definitions/Service" }
        } */

        try {
            const service = await ServiceBusiness.store(req.body);

            return res.status(201).json(service);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['Service']

        const { id } = req.params;

        try {
            const service = await ServiceBusiness.show(id);

            return res.status(200).json(service);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['Service']

        const { id } = req.params;
        const serviceDocument = req.body;

        try {
            const service = await ServiceBusiness.update(id, serviceDocument);

            return res.status(200).json(service);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Service']

        const { id } = req.params;

        try {
            await ServiceBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new ServiceController();
