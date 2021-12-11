import AgentBusiness from '../business/AgentBusiness';

class AgentController {
    async index(req, res, next) {
        // #swagger.tags = ['Agent']

        try {
            const agents = await AgentBusiness.index();

            return res.status(200).json(agents);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['Agent']
        /*   #swagger.parameters['obj'] = {
              in: 'body',
              description: "Adding new Agent.",
              schema: { $ref: "#/definitions/Agent" }
    } */

        try {
            const agent = await AgentBusiness.store(req.body);

            return res.status(201).json(agent);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['Agent']
        const { id } = req.params;

        try {
            const agent = await AgentBusiness.show(id);

            return res.status(200).json(agent);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['Agent']
        const { id } = req.params;
        const agentDocument = req.body;

        try {
            const agent = await AgentBusiness.update(id, agentDocument);

            return res.status(200).send(agent);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Agent']
        const { id } = req.params.id;

        try {
            await AgentBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new AgentController();
