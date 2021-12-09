import HotelBusiness from '../business/HotelBusiness';

class HotelController {
    async index(req, res) {
        // #swagger.tags = ['Hotel']

        try {
            const hotels = await HotelBusiness.index();

            return res.status(200).json(hotels);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['Hotel']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Hotel.",
                schema: { $ref: "#/definitions/Hotel" }
        } */

        try {
            const hotel = await HotelBusiness.store(req.body);

            return res.status(201).json(hotel);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['Hotel']

        const { id } = req.params;

        try {
            const hotel = await HotelBusiness.show(id);

            return res.status(200).json(hotel);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['Hotel']

        const { id } = req.params;
        const hotelDocument = req.body;

        try {
            const hotel = await HotelBusiness.update(id, hotelDocument);

            return res.status(200).json(hotel);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Hotel']

        const { id } = req.params;

        try {
            await HotelBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new HotelController();
