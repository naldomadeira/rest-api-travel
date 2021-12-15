import CategoryAgentBusiness from '../business/CategoryAgentBusiness';

class CategoryAgentController {
    async index(req, res, next) {
        // #swagger.tags = ['CategoryAgent']
        try {
            const categories = await CategoryAgentBusiness.index();

            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['CategoryAgent']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new CategoryAgent.",
                schema: { $ref: "#/definitions/CategoryAgent" }
        } */

        try {
            const category = await CategoryAgentBusiness.store(req.body);

            return res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['CategoryAgent']

        const { id } = req.params;

        try {
            const category = await CategoryAgentBusiness.show(id);

            return res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['CategoryAgent']

        const { id } = req.params;
        const categoryDocument = req.body;

        try {
            const category = await CategoryAgentBusiness.update(
                id,
                categoryDocument
            );

            return res.status(200).send(category);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['CategoryAgent']

        const { id } = req.params;

        try {
            await CategoryAgentBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryAgentController();
