import RoomBusiness from '../business/RoomBusiness';

class RoomController {
    async index(req, res) {
        // #swagger.tags = ['Room']

        try {
            const rooms = await RoomBusiness.index();

            return res.status(200).json(rooms);
        } catch (error) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['Room']
        /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Room - important: type: SGL, DBL, TLP, QDPL .",
                schema: { $ref: "#/definitions/Room" }
    } */

        try {
            const room = await RoomBusiness.store(req.body);

            return res.status(201).json(room);
        } catch (error) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['Room']

        const { id } = req.params;
        try {
            const room = await RoomBusiness.show(id);

            return res.status(200).json(room);
        } catch (error) {
            return res
                .status(500)
                .send({ message: `Error retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['Room']

        const { id } = req.params;
        const roomDocument = req.body;

        try {
            const room = await RoomBusiness.update(id, roomDocument);

            return res.status(200).json(room);
        } catch (error) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Room']

        const { id } = req.params;

        try {
            await RoomBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new RoomController();
