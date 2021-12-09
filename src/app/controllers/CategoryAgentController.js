import CategoryAgentBusiness from '../business/CategoryAgentBusiness';

class CategoryAgentController {
    async index(req, res) {
        // #swagger.tags = ['CategoryAgent']
        try {
            const categories = await CategoryAgentBusiness.index();

            return res.status(200).json(categories);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['CategoryAgent']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new CategoryAgent.",
                schema: { $ref: "#/definitions/CategoryAgent" }
        } */

        try {
            const category = await CategoryAgentBusiness.store(req.body);

            return res.status(201).json(category);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['CategoryAgent']

        const { id } = req.params;

        try {
            const category = await CategoryAgentBusiness.show(id);

            return res.status(200).json(category);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['CategoryAgent']

        const { id } = req.params;
        const categoryDocument = req.body;

        try {
            const category = await CategoryAgentBusiness.update(
                id,
                categoryDocument
            );

            return res.status(200).send(category);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['CategoryAgent']

        const { id } = req.params;

        try {
            await CategoryAgentBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new CategoryAgentController();
