import { OK, CREATED, NO_CONTENT } from 'http-status';
import app from '../../../src/app';
import supertest from 'supertest';
import Hotel from '../../../src/app/models/Hotel';

const request = supertest(app);
const pathBaseHotel = '/api/v1/hotels';

describe('Routes: Hotels', () => {
    const defaultId = 1;
    const defaultHotel = {
        name: 'Default hotel',
        address: 'Av. hotel address',
        country: 'Brazil',
        details: 'hotel description',
        active: true,
    };

    const expectedHotel = { ...defaultHotel, id: defaultId };

    beforeAll(async () => {
        await Hotel.destroy({ where: {} });

        const hotel = new Hotel(defaultHotel);
        hotel.id = defaultId;
        return await hotel.save();
    });

    afterAll(() => {
        //
    });

    describe('GET /hotels', () => {
        it('should return a list of hotels and return 200 as status code', async () => {
            const response = await request.get(`${pathBaseHotel}`);

            expect(response.status).toEqual(OK);
            expect(response.body).toMatchObject([expectedHotel]);
        });

        it('should return a specified hotel and return 200 as status code', async () => {
            const response = await request.get(`${pathBaseHotel}/${defaultId}`);

            expect(response.status).toEqual(OK);
            expect(response.body).toMatchObject(expectedHotel);
        });
    });

    describe('POST /hotels', () => {
        it('should return a new hotel and return 201 as status code', async () => {
            const customId = 2;
            const newHotel = { ...defaultHotel, id: customId };

            const response = await request
                .post(`${pathBaseHotel}`)
                .send(newHotel);

            expect(response.status).toEqual(CREATED);
            expect(response.body).toMatchObject(newHotel);
        });
    });

    describe('PUT /hotels/:id', () => {
        it('should update the specified hotel and return 200 as status code', async () => {
            const customName = 'custom hotel';
            const updatedHotel = { ...defaultHotel, name: customName };

            const response = await request
                .put(`${pathBaseHotel}/${defaultId}`)
                .send(updatedHotel);

            expect(response.status).toEqual(OK);
            expect(response.body).toMatchObject(updatedHotel);
        });
    });

    describe('DELETE /hotels/:id', () => {
        it('should delete a hotel and return 204 as status code', async () => {
            const response = await request.delete(
                `${pathBaseHotel}/${defaultId}`
            );

            expect(response.status).toEqual(NO_CONTENT);
        });
    });
});
