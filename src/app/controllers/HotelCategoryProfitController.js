import HotelCategoryBusiness from '../business/HotelCategoryBusiness';

class HotelCategoryProfitController {
    async index(req, res) {
        // #swagger.tags = ['HotelCategoryAgent']

        try {
            const items = await HotelCategoryBusiness.index();

            return res.status(200).json(items);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieve all items` });
        }
    }

    async store(req, res) {
        // #swagger.tags = ['HotelCategoryAgent']
        /*#swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding a new HoteCategoryAgent.",
                schema: { $ref: "#/definitions/CategoryCategoryAgent" }
        } */

        try {
            const hotelCategory = await HotelCategoryBusiness.store(req.body);

            return res.status(201).json(hotelCategory);
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    async show(req, res) {
        // #swagger.tags = ['HotelCategoryAgent']

        const { id } = req.params;

        try {
            const hotelCategory = await HotelCategoryBusiness.show(id);

            return res.status(200).json(hotelCategory);
        } catch (err) {
            return res
                .status(500)
                .send({ message: `Error retrieving an item` });
        }
    }

    async update(req, res) {
        // #swagger.tags = ['HotelCategoryAgent']

        const { id } = req.params;
        const hotelCategoryDocument = req.body;

        try {
            const hotelCategory = await HotelCategoryBusiness.update(
                id,
                hotelCategoryDocument
            );

            return res.status(200).json(hotelCategory);
        } catch (err) {
            return res.status(500).send({ message: 'Error updating an item' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['HotelCategoryAgent']

        const { id } = req.params;

        try {
            await HotelCategoryBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new HotelCategoryProfitController();
