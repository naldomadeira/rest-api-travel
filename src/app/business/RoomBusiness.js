import Hotel from '../models/Hotel';
import Room from '../models/Room';
import { NotFound } from '../../errors';

class RoomBusiness {
    constructor() {
        this.relationships = {
            attributes: ['id', 'name', 'type', 'active'],
            include: {
                model: Hotel,
                as: 'hotel',
                attributes: ['id', 'name'],
            },
        };
    }

    index() {
        return Room.findAll(this.relationships);
    }

    store(roomDocument) {
        return Room.create(roomDocument);
    }

    async show(roomId) {
        const roomSearched = await this.findOrFail(roomId, this.relationships);

        return roomSearched;
    }

    async update(roomId, roomDocument) {
        const roomSearched = await this.findOrFail(roomId);

        return roomSearched.update(roomDocument);
    }

    async destroy(roomId) {
        const roomSearched = await this.findOrFail(roomId);

        await roomSearched.destroy();
    }

    async findOrFail(roomId, relationships = null) {
        const roomSearched = await Room.findByPk(roomId, relationships);

        if (roomSearched) {
            return roomSearched;
        }

        throw new NotFound(`room doesn't exist`);
    }

    getRelationships() {
        return this.relationships;
    }
}

export default new RoomBusiness();
