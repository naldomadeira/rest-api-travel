import Service from '../models/Service';
import Hotel from '../models/Hotel';
import Room from '../models/Room';
import Coin from '../models/Coin';
import { NotFound } from '../../errors';

class ServiceBusiness {
    constructor() {
        this.relationships = {
            attributes: ['id', 'price'],
            include: [
                {
                    model: Hotel,
                    as: 'hotel',
                    attributes: ['id', 'name'],
                },
                {
                    model: Room,
                    as: 'room',
                    attributes: ['id', 'name'],
                },
                {
                    model: Coin,
                    as: 'coin',
                    attributes: ['id', 'name', 'value'],
                },
            ],
        };
    }

    index() {
        return Service.findAll(this.relationships);
    }

    store(serviceDocument) {
        return Service.create(serviceDocument);
    }

    async show(serviceId) {
        const serviceSearched = await this.findOrFail(
            serviceId,
            this.relationships
        );

        return serviceSearched;
    }

    async update(serviceId, serviceDocument) {
        const serviceSearched = await this.findOrFail(serviceId);

        return serviceSearched.update(serviceDocument);
    }

    async destroy(serviceId) {
        const serviceSearched = await this.findOrFail(serviceId);

        await serviceSearched.destroy();
    }

    async findOrFail(serviceId, relationships = null) {
        const serviceSearched = await Service.findByPk(
            serviceId,
            relationships
        );

        if (serviceSearched) {
            return serviceSearched;
        }

        throw new NotFound(`service doesn't exist`);
    }

    findWhere(where) {
        return Service.findOne({ where, include: this.relationships.include });
    }

    getRelationships() {
        return this.relationships;
    }
}

export default new ServiceBusiness();
