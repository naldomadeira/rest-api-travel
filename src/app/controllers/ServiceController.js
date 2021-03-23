import Room from '../models/Room'
import Hotel from '../models/Hotel'
import Coin from '../models/Coin'
import Service from '../models/Service'

class ServiceController {
  async index(req, res) {
    const services = await Service.findAll({
      attributes: ['id', 'price'],
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

    return res.json(services)
  }

  async store(req, res) {
    const { hotel_id, room_id, coin_id } = req.body

    const hotelExists = await Hotel.findOne({
      where: {
        id: hotel_id,
      },
    })

    if (!hotelExists) {
      res.status(400).json({ error: "Hotel don't exist'" })
    }

    const roomExists = await Room.findOne({
      where: {
        id: room_id,
      },
    })

    if (!roomExists) {
      res.status(400).json({ error: "Room don't exist'" })
    }

    const coinExists = await Coin.findOne({
      where: {
        id: coin_id,
      },
    })

    if (!coinExists) {
      res.status(400).json({ error: "Coin don't exist'" })
    }

    const service = await Service.create(req.body)

    return res.json(service)
  }
}

export default new ServiceController()
