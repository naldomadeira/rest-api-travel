import CustomerBusiness from '../business/CustomerBusiness';

class CustomerController {
    async index(req, res) {
        // #swagger.tags = ['Customer']

        try {
            const customers = await CustomerBusiness.index();

            return res.status(200).json(customers);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['Customer']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Customer.",
                schema: { $ref: "#/definitions/Customer" }
        } */

        try {
            const customer = await CustomerBusiness.store(req.body);

            return res.status(201).json(customer);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['Customer']

        const { id } = req.params;

        try {
            const customer = await CustomerBusiness.show(id);

            return res.status(200).json(customer);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['Customer']

        const { id } = req.params;
        const customerDocument = req.body;

        try {
            const customer = await CustomerBusiness.update(
                id,
                customerDocument
            );

            return res.status(200).json(customer);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Customer']

        const { id } = req.params;

        try {
            await CustomerBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new CustomerController();
