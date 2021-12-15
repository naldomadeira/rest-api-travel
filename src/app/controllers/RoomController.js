import RoomBusiness from '../business/RoomBusiness';

class RoomController {
    async index(req, res, next) {
        // #swagger.tags = ['Room']

        try {
            const rooms = await RoomBusiness.index();

            return res.status(200).json(rooms);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
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
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['Room']

        const { id } = req.params;
        try {
            const room = await RoomBusiness.show(id);

            return res.status(200).json(room);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['Room']

        const { id } = req.params;
        const roomDocument = req.body;

        try {
            const room = await RoomBusiness.update(id, roomDocument);

            return res.status(200).json(room);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Room']

        const { id } = req.params;

        try {
            await RoomBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new RoomController();
