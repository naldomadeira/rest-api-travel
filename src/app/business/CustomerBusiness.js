import Coin from '../models/Coin';
import Customer from '../models/Customer';
import { NotFound } from '../../errors';

class CustomerBusiness {
    constructor() {
        this.relationships = {
            attributes: [
                'id',
                'name',
                'surname',
                'address',
                'phone',
                'country',
            ],
            include: {
                model: Coin,
                as: 'coin',
                attributes: ['id', 'name', 'value', 'profit'],
            },
        };
    }

    index() {
        return Customer.findAll(this.relationships);
    }

    store(customerDocument) {
        return Customer.create(customerDocument);
    }

    async show(customerId) {
        const customerSearched = await this.findOrFail(
            customerId,
            this.relationships
        );

        return customerSearched;
    }

    async update(customerId, customerDocument) {
        const customerSearched = await this.findOrFail(customerId);

        return customerSearched.update(customerDocument);
    }

    async destroy(customerId) {
        const customerSearched = await this.findOrFail(customerId);

        await customerSearched.destroy();
    }

    async findOrFail(customerId, relationships = null) {
        const customerSearched = await Customer.findByPk(
            customerId,
            relationships
        );

        if (customerSearched) {
            return customerSearched;
        }

        throw new NotFound(`customer doesn't exist`);
    }

    getRelationships() {
        return this.relationships;
    }
}

export default new CustomerBusiness();
