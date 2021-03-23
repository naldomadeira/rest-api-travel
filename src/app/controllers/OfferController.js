import Customer from '../models/Customer'
import Agent from '../models/Agent'
import Service from '../models/Service'
import Offer from '../models/Offer'

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
    const { customer_id, agent_id, service_id } = req.body

    const customerExists = await Customer.findOne({
      where: {
        id: customer_id,
      },
    })

    if (!customerExists) {
      res.status(400).json({ error: "Customer don't exist'" })
    }

    const agentExists = await Agent.findOne({
      where: {
        id: agent_id,
      },
    })

    if (!agentExists) {
      res.status(400).json({ error: "Agent don't exist'" })
    }

    const serviceExists = await Service.findOne({
      where: {
        id: service_id,
      },
    })

    if (!serviceExists) {
      res.status(400).json({ error: "Service don't exist'" })
    }

    const offer = await Offer.create(req.body)

    return res.json(offer)
  }
}

export default new OfferController()
