import Hotel from '../models/Hotel';
import Room from '../models/Room';
import Business from '../common/business';
import { NotFound } from '../../errors';

const relationships = {
    attributes: ['id', 'name', 'address', 'country', 'details', 'active'],
    include: {
        model: Room,
        as: 'rooms',
        attributes: ['id', 'name'],
    },
};

class HotelBusiness extends Business {
    async index() {
        const hotels = await Hotel.findAll(relationships);
        return this.envelope(hotels);
    }

    async store(hotelDocument) {
        const hotel = await Hotel.create(hotelDocument);
        return this.envelope(hotel);
    }

    async show(hotelId) {
        const hotelSearched = await this.findOrFail(hotelId, relationships);

        return this.envelope(hotelSearched);
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
