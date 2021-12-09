import AgentBusiness from '../business/AgentBusiness';

class AgentController {
    async index(req, res) {
        // #swagger.tags = ['Agent']

        try {
            const agents = await AgentBusiness.index();

            return res.status(200).json(agents);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['Agent']
        /*   #swagger.parameters['obj'] = {
              in: 'body',
              description: "Adding new Agent.",
              schema: { $ref: "#/definitions/Agent" }
    } */

        try {
            const agent = await AgentBusiness.store(req.body);

            return res.status(201).json(agent);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['Agent']
        const { id } = req.params;

        try {
            const agent = await AgentBusiness.show(id);

            return res.status(200).json(agent);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['Agent']
        const { id } = req.params;
        const agentDocument = req.body;

        try {
            const agent = await AgentBusiness.update(id, agentDocument);

            return res.status(200).send(agent);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Agent']
        const { id } = req.params.id;

        try {
            await AgentBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new AgentController();
