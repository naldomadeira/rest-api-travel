import Offer from '../models/Offer';
import { NotFound } from '../../errors';
import Customer from '../models/Customer';
import Agent from '../models/Agent';
import Service from '../models/Service';
import { parseISO, isBefore, isEqual, differenceInDays } from 'date-fns';
import CustomerBusiness from '../business/CustomerBusiness';
import ServiceBusiness from '../business/ServiceBusiness';
import AgentBusiness from '../business/AgentBusiness';
import HotelCategoryBusiness from '../business/HotelCategoryBusiness';
import ExchangeBusiness from '../business/ExchangeBusiness';
import ExchangeProfitBusiness from '../business/ExchangeProfitBusiness';

class OfferBusiness {
    constructor() {
        this.relationships = {
            attributes: [
                'id',
                'name',
                'price',
                'paid',
                'checkin',
                'checkout',
                'active',
            ],
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['id', 'name'],
                },
                {
                    model: Agent,
                    as: 'agent',
                    attributes: ['id', 'name'],
                },
                {
                    model: Service,
                    as: 'service',
                    attributes: ['id', 'hotel_id', 'room_id', 'price'],
                },
            ],
        };
    }

    index() {
        return Offer.findAll(this.relationships);
    }

    async store(payload) {
        const {
            customer_id,
            agent_id,
            service_id,
            checkin,
            checkout,
        } = payload;

        const parsedDateCheckin = parseISO(checkin);
        const parsedDateCheckout = parseISO(checkout);

        this.throwIfDataIsInvalid(parsedDateCheckin, parsedDateCheckout);

        const customer = await CustomerBusiness.findOrFail(
            customer_id,
            CustomerBusiness.getRelationships()
        );
        const agent = await AgentBusiness.findOrFail(
            agent_id,
            AgentBusiness.getRelationships()
        );
        let service = await ServiceBusiness.findOrFail(
            service_id,
            ServiceBusiness.getRelationships()
        );

        // get value initial of service offer
        let priceService = service.price;

        /**
         * enough if the coins(customer and service) are the same
         */
        console.log(customer.coin.id);
        console.log(service.coin.id);
        if (customer.coin.id !== service.coin.id) {
            const newService = await this.getServiceWithCoinOfCustomer(
                service,
                customer
            );

            if (newService) {
                service = newService;
                priceService = parseFloat(service.price);
            } else {
                priceService = await this.generateExchangeCoin(
                    service,
                    customer
                );
            }
        }

        let total = 0;
        total += priceService;

        // load the margin profit of the agency on top of the agent
        console.log(agent);
        let profitAgent = this.getAgentProfit(agent);
        total += priceService * profitAgent;

        // load the margin profit of the agency on top of the Hotel Category
        let profitHotelCategory = await this.getHotelCategoryProfit(
            agent,
            service
        );

        total += priceService * profitHotelCategory;

        //load the margin profit of the coin of customer
        let coinProfit = this.getCoinProfit(customer);

        total += priceService * coinProfit;

        //multiplies the result by the number of days
        const diffDays = differenceInDays(
            parsedDateCheckout,
            parsedDateCheckin
        );

        if (diffDays) {
            total *= Number(diffDays);
        }

        //inserts the total value into the object and saves it in the database
        return Offer.create({ ...payload, price: total });
    }

    async show(offerId) {
        const offerSearched = await this.findOrFail(
            offerId,
            this.relationships
        );

        return offerSearched;
    }

    async update(offerId, payload) {
        const offerSearched = await this.findOrFail(offerId);

        return offerSearched.update(payload);
    }

    async destroy(offerId) {
        const offerSearched = await this.findOrFail(offerId);

        await offerSearched.destroy();
    }

    async findOrFail(offerId, relationships = null) {
        const offerSearched = await Offer.findByPk(offerId, relationships);

        if (offerSearched) {
            return offerSearched;
        }

        throw new NotFound(`offer doesn't exist`);
    }

    async throwIfDataIsInvalid(checkinDate, checkoutDate) {
        /**
         * Check for past dates
         */
        if (
            isBefore(checkinDate, new Date()) ||
            isBefore(checkoutDate, new Date())
        ) {
            throw new Error('Past date are not permitted');
        }

        /**
         * Check for equal dates
         */
        if (isEqual(checkinDate, checkoutDate)) {
            throw new Error('Dates can are not equals');
        }
    }

    getServiceWithCoinOfCustomer(service, customer) {
        /**
         * if the currencies are the same, look for an equivalent service
         */

        const where = {
            hotel_id: service.hotel.id,
            room_id: service.room.id,
            coin_id: customer.coin.id,
        };

        return ServiceBusiness.findWhere(where);

        /**
         * if there is an equivalent service in the customer's currency,
         * this will be the new service
         */
    }

    async generateExchangeCoin(service, customer) {
        //get exchange profit

        const where = {
            active: true,
        };

        const profitExchange = await ExchangeProfitBusiness.findWhere(where);

        let profit = 0;
        const priceService = service.price;

        //check if exists
        if (profitExchange) {
            profit = parseFloat(profitExchange.profit);
        }

        //exchange currencies and margin profit
        const valueCurrencyService = service.coin.value;
        const valueCurrentyCustomer = customer.coin.value;

        let exchange = valueCurrencyService * valueCurrentyCustomer;
        exchange += exchange * profit;
        // calculates the conversion value with the margin profit

        //saves the exchange rate in the database
        const newValueService = priceService * exchange;

        const newExchange = {
            coin_from: service.coin.id,
            coin_to: customer.coin.id,
            customer_id: customer.id,
            amount_from: priceService,
            amount_total: newValueService,
        };

        await ExchangeBusiness.store(newExchange);

        return newValueService;
    }

    getAgentProfit(agent) {
        let profitAgent = 0;

        if (agent.category.profit) {
            profitAgent = parseFloat(agent.category.profit);
        }

        return profitAgent;
    }

    getCoinProfit(customer) {
        let profitCoin = 0;

        if (customer.coin.profit) {
            profitCoin = parseFloat(customer.coin.profit);
        }
        return profitCoin;
    }

    async getHotelCategoryProfit(agent, service) {
        let profitHotelCategory = 0;

        const where = {
            category_agent_id: agent.category.id,
            hotel_id: service.hotel.id,
        };

        const hotelCategoryProfit = await HotelCategoryBusiness.findWhere(
            where
        );

        if (hotelCategoryProfit) {
            profitHotelCategory = parseFloat(hotelCategoryProfit.profit);
        }

        return profitHotelCategory;
    }

    getRelationships() {
        return this.relationships;
    }
}

export default new OfferBusiness();
