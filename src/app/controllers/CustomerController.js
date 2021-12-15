import CustomerBusiness from '../business/CustomerBusiness';

class CustomerController {
    async index(req, res, next) {
        // #swagger.tags = ['Customer']

        try {
            const customers = await CustomerBusiness.index();

            return res.status(200).json(customers);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['Customer']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Customer.",
                schema: { $ref: "#/definitions/Customer" }
        } */

        try {
            const customer = await CustomerBusiness.store(req.body);

            return res.status(201).json(customer);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['Customer']

        const { id } = req.params;

        try {
            const customer = await CustomerBusiness.show(id);

            return res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['Customer']

        const { id } = req.params;
        const customerDocument = req.body;

        try {
            const customer = await CustomerBusiness.update(
                id,
                customerDocument
            );

            return res.status(200).json(customer);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Customer']

        const { id } = req.params;

        try {
            await CustomerBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new CustomerController();
