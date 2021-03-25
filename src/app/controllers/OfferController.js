import Customer from '../models/Customer'
import Agent from '../models/Agent'
import Service from '../models/Service'
import Offer from '../models/Offer'
import HotelCategoryProfit from '../models/HotelCategoryProfit'
import Coin from '../models/Coin'
import CategoryAgent from '../models/CategoryAgent'
import Hotel from '../models/Hotel'
import Room from '../models/Room'
import Exchange from '../models/Exchange'
import ExchangeProfit from '../models/ExchangeProfit'

import { parseISO, isBefore, isEqual, differenceInDays } from 'date-fns'

class OfferController {
  async index(req, res) {
    // #swagger.tags = ['Offer']
    const offers = await Offer.findAll({
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
    })

    return res.json(offers)
  }

  async store(req, res, next) {
    // #swagger.tags = ['Offer']
    /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new offer - important: all registered profit margins .",
                schema: { $ref: "#/definitions/Offer" }
    } */

    const { customer_id, agent_id, service_id, checkin, checkout } = req.body

    const parsedDateCheckin = parseISO(checkin)
    const parsedDateCheckout = parseISO(checkout)

    /**
     * Check for past dates
     */
    if (
      isBefore(parsedDateCheckin, new Date()) ||
      isBefore(parsedDateCheckout, new Date())
    ) {
      return res.status(400).json({ error: 'Past date are not permitted ' })
    }

    /**
     * Check for equal dates
     */
    if (isEqual(parsedDateCheckin, parsedDateCheckout)) {
      return res.status(400).json({ error: 'Dates can are not equals' })
    }

    const customerExists = await Customer.findOne({
      where: {
        id: customer_id,
      },
      include: {
        model: Coin,
        as: 'coin',
        attributes: ['id', 'profit', 'value'],
      },
    })

    if (!customerExists) {
      res.status(400).json({ error: "Customer don't exist'" })
    }

    const agentExists = await Agent.findOne({
      where: {
        id: agent_id,
      },
      include: {
        model: CategoryAgent,
        as: 'category',
        attributes: ['id', 'profit'],
      },
    })

    if (!agentExists) {
      res.status(400).json({ error: "Agent don't exist'" })
    }

    let serviceExists = await Service.findOne({
      where: {
        id: service_id,
      },
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
    })

    if (!serviceExists) {
      res.status(400).json({ error: "Service don't exist'" })
    }

    // get value initial of service offer
    let priceService = 0
    priceService = serviceExists.price

    /**
     * enough if the coins(customer and service) are the same
     */
    if (customerExists.coin.id !== serviceExists.coin.id) {
      /**
       * if the currencies are the same, look for an equivalent service
       */
      const serviceCoinEqual = await Service.findOne({
        where: {
          hotel_id: serviceExists.hotel.id,
          room_id: serviceExists.room.id,
          coin_id: customerExists.coin.id,
        },
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
      })

      /**
       * if there is an equivalent service in the customer's currency,
       * this will be the new service
       */
      if (serviceCoinEqual) {
        serviceExists = serviceCoinEqual
        if (serviceExists.price) {
          priceService = parseFloat(serviceExists.price)
        }
      } else {
        //get exchange profit
        const profitExchange = await ExchangeProfit.findOne({
          where: { active: true },
        })
        let profit = 0

        //check if exists
        if (profitExchange) {
          profit = parseFloat(profitExchange.profit)
        }

        //exchange currencies and margin profit
        const valueService = serviceExists.coin.value
        const valueCustomerCoin = customerExists.coin.value
        let exchange = valueService * valueCustomerCoin
        exchange += exchange * profit
        // calculates the conversion value with the margin profit

        //saves the exchange rate in the database
        const newValueService = priceService * exchange
        const newExchange = {
          coin_from: serviceExists.coin.id,
          coin_to: customerExists.coin.id,
          customer_id: customerExists.id,
          amount_from: priceService,
          amount_total: newValueService,
        }
        await Exchange.create(newExchange)

        //update price service with coin costumer
        priceService = newValueService
      }
    }

    let total = 0
    total += priceService

    // load the margin profit of the agency on top of the agent
    let profitAgent = 0
    if (agentExists.category.profit) {
      profitAgent = parseFloat(agentExists.category.profit)
    }

    total += priceService * profitAgent

    // load the margin profit of the agency on top of the Hotel Category
    const hotelCategoryProfit = await HotelCategoryProfit.findOne({
      where: {
        category_agent_id: agentExists.category_agent_id,
        hotel_id: serviceExists.hotel_id,
      },
    })
    let profitHotelCategory = 0
    if (hotelCategoryProfit) {
      profitHotelCategory = parseFloat(hotelCategoryProfit.profit)
    }

    total += priceService * profitHotelCategory

    //load the margin profit of the coin of customer
    let coinProfit = 0
    if (customerExists.coin.profit) {
      coinProfit = parseFloat(customerExists.coin.profit)
    }

    total += priceService * coinProfit

    //multiplies the result by the number of days
    const diffDays = differenceInDays(parsedDateCheckout, parsedDateCheckin)
    if (diffDays) {
      total *= Number(diffDays)
    }

    //inserts the total value into the object and saves it in the database
    const offer = await Offer.create({ ...req.body, price: total })

    return res.json(offer)
  }

  /**
   * this method only updates the payment status
   */
  async update(req, res) {
    // #swagger.tags = ['Offer']

    const id = req.params.id
    const { paid } = req.body
    try {
      if (paid && id) {
        const offerExists = await Offer.findByPk(id)
        if (!offerExists) {
          return res.status(400).json({ error: "Offer don't exist'" })
        }
        await Service.update(req.body, {
          where: { id: id },
        })
        return res
          .status(200)
          .send(`item with id=${id} was updated successfully!`)
      } else {
        return res.status(500).send({ message: 'Error update paid offer' })
      }
    } catch (err) {
      return res.status(500).send({ message: 'Error update item information' })
    }
  }

  async destroy(req, res) {
    // #swagger.tags = ['Offer']

    const id = req.params.id

    try {
      const offerExists = await Offer.findByPk(id)
      if (!offerExists) {
        return res.status(400).json({ error: "Offer don't exist'" })
      }

      await Offer.destroy({
        where: { id: id },
      })

      return res.status(204).send({
        message: `item with id=${id} was deleted successfully!`,
      })
    } catch (err) {
      return res.status(500).send({
        message: `Could not delete item with id=${id}`,
      })
    }
  }
}

export default new OfferController()
