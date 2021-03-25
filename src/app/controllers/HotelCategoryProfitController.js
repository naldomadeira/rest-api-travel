import CategoryAgent from '../models/CategoryAgent'
import Hotel from '../models/Hotel'
import HotelCategory from '../models/HotelCategoryProfit'

class HotelCategoryProfitController {
  async index(req, res) {
    // #swagger.tags = ['HotelCategoryAgent']

    try {
      const hotelsCategories = await HotelCategory.findAll({
        attributes: ['id', 'profit'],
        include: [
          {
            model: Hotel,
            as: 'hotel',
            attributes: ['id', 'name'],
          },
          {
            model: CategoryAgent,
            as: 'CategoryAgent',
            attributes: ['id', 'name'],
          },
        ],
      })
      return res.status(200).json(hotelsCategories)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['HotelCategoryAgent']
    /*#swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding a new HoteCategoryAgent.",
                schema: { $ref: "#/definitions/CategoryCategoryAgent" }
    } */

    const { hotel_id, category_agent_id } = req.body

    try {
      const hotelExists = await Hotel.findOne({
        where: {
          id: hotel_id,
        },
      })

      if (!hotelExists) {
        res.status(400).json({ error: "Hotel don't exist'" })
      }

      const categoryExists = await CategoryAgent.findOne({
        where: {
          id: category_agent_id,
        },
      })

      if (!categoryExists) {
        res.status(400).json({ error: "Category Agent don't exist'" })
      }

      const hotelCategory = await HotelCategory.create(req.body)

      return res.status(201).json(hotelCategory)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['HotelCategoryAgent']

    try {
      const hotelCategoryExists = await HotelCategory.findByPk(req.params.id, {
        attributes: ['id', 'profit'],
        include: [
          {
            model: Hotel,
            as: 'hotel',
            attributes: ['id', 'name'],
          },
          {
            model: CategoryAgent,
            as: 'CategoryAgent',
            attributes: ['id', 'name'],
          },
        ],
      })
      if (!hotelCategoryExists) {
        return res.status(400).json({ error: "Hotel Category don't exist'" })
      }

      return res.status(200).json(hotelCategoryExists)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['HotelCategoryAgent']

    const id = req.params.id
    const { hotel_id, category_agent_id } = req.body

    try {
      const hotelCategoryExists = await HotelCategory.findByPk(req.params.id)
      if (!hotelCategoryExists) {
        return res.status(400).json({ error: "Service don't exist'" })
      }

      if (hotel_id) {
        const hotelExists = await Hotel.findOne({
          where: {
            id: hotel_id,
          },
        })

        if (!hotelExists) {
          res.status(400).json({ error: "Hotel don't exist'" })
        }
      }

      if (category_agent_id) {
        const categoryExists = await CategoryAgent.findOne({
          where: {
            id: category_agent_id,
          },
        })

        if (!categoryExists) {
          res.status(400).json({ error: "Category Agent don't exist'" })
        }
      }
      await CategoryAgent.update(req.body, {
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
    // #swagger.tags = ['HotelCategoryAgent']

    const id = req.params.id

    try {
      const hotelCategoryExists = await HotelCategory.findByPk(req.params.id)
      if (!hotelCategoryExists) {
        return res.status(400).json({ error: "Hotel Category don't exist'" })
      }

      await HotelCategory.destroy({
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

export default new HotelCategoryProfitController()
