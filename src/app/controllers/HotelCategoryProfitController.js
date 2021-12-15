import HotelCategoryBusiness from '../business/HotelCategoryBusiness';

class HotelCategoryProfitController {
    async index(req, res, next) {
        // #swagger.tags = ['HotelCategoryAgent']

        try {
            const items = await HotelCategoryBusiness.index();

            return res.status(200).json(items);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['HotelCategoryAgent']
        /*#swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding a new HoteCategoryAgent.",
                schema: { $ref: "#/definitions/CategoryCategoryAgent" }
        } */

        try {
            const hotelCategory = await HotelCategoryBusiness.store(req.body);

            return res.status(201).json(hotelCategory);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        // #swagger.tags = ['HotelCategoryAgent']

        const { id } = req.params;

        try {
            const hotelCategory = await HotelCategoryBusiness.show(id);

            return res.status(200).json(hotelCategory);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        // #swagger.tags = ['HotelCategoryAgent']

        const { id } = req.params;
        const hotelCategoryDocument = req.body;

        try {
            const hotelCategory = await HotelCategoryBusiness.update(
                id,
                hotelCategoryDocument
            );

            return res.status(200).json(hotelCategory);
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['HotelCategoryAgent']

        const { id } = req.params;

        try {
            await HotelCategoryBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new HotelCategoryProfitController();
