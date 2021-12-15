import ServiceBusiness from '../business/ServiceBusiness';

class ServiceController {
    async index(req, res, next) {
        // #swagger.tags = ['Service']

        try {
            const services = await ServiceBusiness.index();

            return res.status(200).json(services);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['Service']
        /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Service.",
                schema: { $ref: "#/definitions/Service" }
        } */

        try {
            const service = await ServiceBusiness.store(req.body);

            return res.status(201).json(service);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['Service']

        const { id } = req.params;

        try {
            const service = await ServiceBusiness.show(id);

            return res.status(200).json(service);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['Service']

        const { id } = req.params;
        const serviceDocument = req.body;

        try {
            const service = await ServiceBusiness.update(id, serviceDocument);

            return res.status(200).json(service);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Service']

        const { id } = req.params;

        try {
            await ServiceBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new ServiceController();
