import Hotel from '../models/Hotel';
import Room from '../models/Room';
import { NotFound } from '../../errors';

const relationships = {
    attributes: ['id', 'name', 'country', 'details', 'active'],
    include: {
        model: Room,
        as: 'rooms',
        attributes: ['id', 'name'],
    },
};

class HotelBusiness {
    index() {
        return Hotel.findAll(relationships);
    }

    store(hotelDocument) {
        return Hotel.create(hotelDocument);
    }

    async show(hotelId) {
        const hotelSearched = await this.findOrFail(hotelId, relationships);

        return hotelSearched;
    }

    async update(hotelId, hotelDocument) {
        const hotelSearched = await this.findOrFail(hotelId);

        return hotelSearched.update(hotelDocument);
    }

    async destroy(hotelId) {
        const hotelSearched = await this.findOrFail(hotelId);

        await hotelSearched.destroy();
    }

    async findOrFail(hotelId, relationships = null) {
        const hotelSearched = await Hotel.findByPk(hotelId, relationships);

        if (hotelSearched) {
            return hotelSearched;
        }

        throw new NotFound(`hotel doesn't exist`);
    }
}

export default new HotelBusiness();
