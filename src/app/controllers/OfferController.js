import OfferBusiness from '../business/OfferBusiness';
import Service from '../models/Service';
import Offer from '../models/Offer';

class OfferController {
    async index(req, res, next) {
        // #swagger.tags = ['Offer']

        try {
            const offers = await OfferBusiness.index();

            return res.status(200).json(offers);
        } catch (error) {
            next(error);
        }
    }

    async store(req, res, next) {
        // #swagger.tags = ['Offer']
        /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new offer - important: all registered profit margins .",
                schema: { $ref: "#/definitions/Offer" }
        } */
        try {
            const offer = await OfferBusiness.store(req.body);

            return res.status(201).json(offer);
        } catch (error) {
            next(error);
        }
    }

    /**
     * this method only updates the payment status
     */
    async update(req, res, next) {
        // #swagger.tags = ['Offer']

        const id = req.params.id;
        const { paid } = req.body;
        try {
            if (paid && id) {
                const offerExists = await Offer.findByPk(id);
                if (!offerExists) {
                    return res
                        .status(400)
                        .json({ error: "Offer don't exist'" });
                }
                await Service.update(req.body, {
                    where: { id: id },
                });
                return res
                    .status(200)
                    .send(`item with id=${id} was updated successfully!`);
            } else {
                return res
                    .status(500)
                    .send({ message: 'Error update paid offer' });
            }
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        // #swagger.tags = ['Offer']

        const { id } = req.params;

        try {
            await OfferBusiness.destroy(id);

            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}

export default new OfferController();
