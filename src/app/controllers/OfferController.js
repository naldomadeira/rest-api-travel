import Customer from '../models/Customer'
import Agent from '../models/Agent'
import Service from '../models/Service'
import Offer from '../models/Offer'
import HotelCategoryProfit from '../models/HotelCategoryProfit'
import Coin from '../models/Coin'
import CategoryAgent from '../models/CategoryAgent'
import Hotel from '../models/Hotel'
import Room from '../models/Room'

import { parseISO, isBefore, isEqual, differenceInDays } from 'date-fns'

class OfferController {
  async index(req, res) {
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

  async store(req, res) {
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
        attributes: ['id', 'profit'],
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
          attributes: ['id', 'name'],
        },
      ],
    })

    if (!serviceExists) {
      res.status(400).json({ error: "Service don't exist'" })
    }

    // pegar o valor do serviço
    let priceService = parseFloat(serviceExists.price)

    if (customerExists.coin.id !== serviceExists.coin.id) {
      const serviceCoinEqual = await Service.Service.findOne({
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
            attributes: ['id', 'name'],
          },
        ],
      })
      //mudança no serviço
      if (serviceCoinEqual) {
        serviceExists = serviceCoinEqual
        priceService = parseFloat(serviceExists.price)
      } else {
        //update valores das moedas

        //fazer o cambio
        let exchange =
          parseFloat(serviceExists.coin.value) *
          parseFloat(customerExists.coin.value)

        priceService = exchange
      }
    }

    let total = 0
    total += priceService

    // pegar a margem da agência
    const profitAgent = parseFloat(agentExists.category.profit)
    total += priceService * profitAgent

    // pegar a margem Hotel Category
    const hotelCategoryProfit = await HotelCategoryProfit.findOne({
      where: {
        category_agent_id: agentExists.category_agent_id,
        hotel_id: serviceExists.hotel_id,
      },
    })
    const profitHotelCategory = parseFloat(hotelCategoryProfit.profit)
    total += priceService * profitHotelCategory

    //pegar a margem da moeda do cliente
    const coinProfit = parseFloat(customerExists.coin.profit)
    total += priceService * coinProfit

    //multiplica o resultado pela quantidade de dias
    const diffDays = differenceInDays(parsedDateCheckout, parsedDateCheckin)
    total *= Number(diffDays)

    //insere o valor calculado no objeto e salva no banco
    const offer = await Offer.create({ ...req.body, price: total })

    return res.json(offer)
  }
}

export default new OfferController()
