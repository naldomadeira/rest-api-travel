import Room from '../models/Room'
import Hotel from '../models/Hotel'

class RoomController {
  async index(req, res) {
    // #swagger.tags = ['Room']

    try {
      const rooms = await Room.findAll({
        attributes: ['id', 'name', 'type', 'active'],
        include: {
          model: Hotel,
          as: 'hotel',
          attributes: ['id', 'name'],
        },
      })
      return res.status(200).json(rooms)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['Room']
    /* #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Room - important: type: SGL, DBL, TLP, QDPL .",
                schema: { $ref: "#/definitions/Room" }
    } */

    const { hotel_id } = req.body
    try {
      if (hotel_id) {
        const hotelExists = await Hotel.findOne({
          where: {
            id: hotel_id,
          },
        })

        if (!hotelExists) {
          return res.status(400).json({ error: "Hotel don't exist'" })
        }
      }
      const room = await Room.create(req.body)
      return res.status(201).json(room)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['Room']

    try {
      const roomExists = await Room.findByPk(req.params.id, {
        include: [
          {
            model: Hotel,
            as: 'hotel',
            attributes: ['id', 'name'],
          },
        ],
      })
      if (!roomExists) {
        return res.status(400).json({ error: "Room don't exist'" })
      }

      return res.status(200).json(roomExists)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['Room']

    const id = req.params.id

    try {
      const roomExists = await Room.findByPk(req.params.id)
      if (!roomExists) {
        return res.status(400).json({ error: "Room don't exist'" })
      }

      await Room.update(req.body, {
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
    // #swagger.tags = ['Room']

    const id = req.params.id

    try {
      const roomExists = await Room.findByPk(req.params.id)
      if (!roomExists) {
        return res.status(400).json({ error: "Room don't exist'" })
      }

      await Room.destroy({
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

export default new RoomController()
