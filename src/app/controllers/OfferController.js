import OfferBusiness from '../business/OfferBusiness';
import Service from '../models/Service';
import Offer from '../models/Offer';

class OfferController {
    async index(req, res) {
        // #swagger.tags = ['Offer']
        const offers = await OfferBusiness.index();

        return res.json(offers);
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
        } catch (err) {
            return res.status(500).send({ message: `Error inserting an item` });
        }
    }

    /**
     * this method only updates the payment status
     */
    async update(req, res) {
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
        } catch (err) {
            return res
                .status(500)
                .send({ message: 'Error update item information' });
        }
    }

    async destroy(req, res) {
        // #swagger.tags = ['Offer']

        const { id } = req.params;

        try {
            await OfferBusiness.destroy(id);

            return res.status(204).send();
        } catch (err) {
            return res.status(500).send({
                message: `Couldn't delete item with id=${id}`,
            });
        }
    }
}

export default new OfferController();
