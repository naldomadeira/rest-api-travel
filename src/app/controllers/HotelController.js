import Hotel from '../models/Hotel'
import Room from '../models/Room'

class HotelController {
  async index(req, res) {
    // #swagger.tags = ['Hotel']

    try {
      const hotels = await Hotel.findAll({
        include: [
          {
            model: Room,
            as: 'rooms',
            attributes: ['id', 'name'],
          },
        ],
      })
      return res.status(200).json(hotels)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['Hotel']
    /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Hotel.",
                schema: { $ref: "#/definitions/Hotel" }
        } */

    try {
      const hotel = await Hotel.create(req.body)
      return res.status(201).json(hotel)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['Hotel']

    try {
      const HotelExist = await Hotel.findByPk(req.params.id, {
        include: [
          {
            model: Room,
            as: 'rooms',
            attributes: ['id', 'name'],
          },
        ],
      })
      if (!HotelExist) {
        return res.status(400).json({ error: "hotel don't exist'" })
      }

      return res.status(200).json(HotelExist)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['Hotel']

    const id = req.params.id

    try {
      const HotelExist = await Hotel.findByPk(req.params.id)
      if (!HotelExist) {
        return res.status(400).json({ error: "hotel don't exist'" })
      }

      await Hotel.update(req.body, {
        where: { id: id },
      })
      return res
        .status(200)
        .send(`item with id=${id} was updated successfully!`)
    } catch (err) {
      return res
        .status(500)
        .send({ message: 'Error update item agent information' })
    }
  }

  async destroy(req, res) {
    // #swagger.tags = ['Hotel']

    const id = req.params.id

    try {
      const HotelExist = await Hotel.findByPk(req.params.id)
      if (!HotelExist) {
        return res.status(400).json({ error: "hotel don't exist'" })
      }

      await Hotel.destroy({
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

export default new HotelController()
