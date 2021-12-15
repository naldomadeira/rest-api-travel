import HotelBusiness from '../business/HotelBusiness';

class HotelController {
    async index(req, res, next) {
        // #swagger.tags = ['Hotel']

        try {
            const hotels = await HotelBusiness.index();

            return res.status(200).json(hotels);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['Hotel']
        /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Hotel.",
                schema: { $ref: "#/definitions/Hotel" }
        } */

        try {
            const hotel = await HotelBusiness.store(req.body);

            return res.status(201).json(hotel);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['Hotel']

        const { id } = req.params;

        try {
            const hotel = await HotelBusiness.show(id);

            return res.status(200).json(hotel);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['Hotel']

        const { id } = req.params;
        const hotelDocument = req.body;

        try {
            const hotel = await HotelBusiness.update(id, hotelDocument);

            return res.status(200).json(hotel);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Hotel']

        const { id } = req.params;

        try {
            await HotelBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new HotelController();
