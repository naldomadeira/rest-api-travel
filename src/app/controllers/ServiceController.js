import Room from '../models/Room'
import Hotel from '../models/Hotel'
import Coin from '../models/Coin'
import Service from '../models/Service'

class ServiceController {
  async index(req, res) {
    // #swagger.tags = ['Service']

    try {
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
      return res.status(200).json(services)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['Service']
    /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Service.",
                schema: { $ref: "#/definitions/Service" }
    } */

    const { hotel_id, room_id, coin_id } = req.body
    try {
      const hotelExists = await Hotel.findOne({
        where: {
          id: hotel_id,
        },
      })

      if (!hotelExists) {
        return res.status(400).json({ error: "Hotel don't exist'" })
      }

      const roomExists = await Room.findOne({
        where: {
          id: room_id,
        },
      })

      if (!roomExists) {
        return res.status(400).json({ error: "Room don't exist'" })
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

      return res.status(201).json(service)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['Service']

    try {
      const serviceExists = await Service.findByPk(req.params.id, {
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
      if (!serviceExists) {
        return res.status(400).json({ error: "Service don't exist'" })
      }

      return res.status(200).json(serviceExists)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['Service']

    const id = req.params.id
    const { hotel_id, room_id, coin_id } = req.body

    try {
      if (hotel_id) {
        const serviceExists = await Service.findByPk(req.params.id)
        if (!serviceExists) {
          return res.status(400).json({ error: "Service don't exist'" })
        }

        const hotelExists = await Hotel.findOne({
          where: {
            id: hotel_id,
          },
        })

        if (!hotelExists) {
          return res.status(400).json({ error: "Hotel don't exist'" })
        }
      }

      if (room_id) {
        const roomExists = await Room.findOne({
          where: {
            id: room_id,
          },
        })

        if (!roomExists) {
          return res.status(400).json({ error: "Room don't exist'" })
        }
      }

      if (coin_id) {
        const coinExists = await Coin.findOne({
          where: {
            id: coin_id,
          },
        })

        if (!coinExists) {
          res.status(400).json({ error: "Coin don't exist'" })
        }
      }

      await Service.update(req.body, {
        where: { id: id },
      })
      return res
        .status(200)
        .send(`item with id=${id} was updated successfully!`)
    } catch (err) {
      return res.status(500).send({ message: 'Error update item information' })
    }
  }

  async destroy(req, res) {
    // #swagger.tags = ['Service']

    const id = req.params.id

    try {
      const serviceExists = await Service.findByPk(req.params.id)
      if (!serviceExists) {
        return res.status(400).json({ error: "Service don't exist'" })
      }

      await Service.destroy({
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

export default new ServiceController()
