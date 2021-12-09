import HotelCategoryProfit from '../models/HotelCategoryProfit';
import { NotFound } from '../../errors';
import Hotel from '../models/Hotel';
import CategoryAgent from '../models/CategoryAgent';

const relationships = {
    attributes: ['id', 'profit'],
    include: [
        {
            model: Hotel,
            as: 'hotel',
            attributes: ['id', 'name'],
        },
        {
            model: CategoryAgent,
            as: 'CategoryAgent',
            attributes: ['id', 'name'],
        },
    ],
};

class HotelCategoryBusiness {
    index() {
        return HotelCategoryProfit.findAll(relationships);
    }

    store(hotelCategoryDocument) {
        return HotelCategoryProfit.create(hotelCategoryDocument);
    }

    async show(hotelCategoryId) {
        const hotelCategorySearched = await this.findOrFail(
            hotelCategoryId,
            relationships
        );

        return hotelCategorySearched;
    }

    async update(hotelCategoryId, hotelCategoryDocument) {
        const hotelCategorySearched = await this.findOrFail(hotelCategoryId);

        return hotelCategorySearched.update(hotelCategoryDocument);
    }

    async destroy(hotelCategoryId) {
        const hotelCategorySearched = await this.findOrFail(hotelCategoryId);

        await hotelCategorySearched.destroy();
    }

    async findOrFail(hotelcategoryprofitId, relationships = null) {
        const hotelCategorySearched = await HotelCategoryProfit.findByPk(
            hotelcategoryprofitId,
            relationships
        );

        if (hotelCategorySearched) {
            return hotelCategorySearched;
        }

        throw new NotFound(`hotel category relationship doesn't exist`);
    }

    findWhere(where) {
        return HotelCategoryProfit.findOne({
            where,
            relationships,
        });
    }
}

export default new HotelCategoryBusiness();
