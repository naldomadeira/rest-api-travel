import CategoryAgent from '../models/CategoryAgent'
import Hotel from '../models/Hotel'
import HotelCategory from '../models/HotelCategoryProfit'

class HotelCategoryProfitController {
  async index(req, res) {
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

    return res.json(hotelsCategories)
  }

  async store(req, res) {
    const { hotel_id, category_agent_id } = req.body

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

    return res.json(hotelCategory)
  }
}

export default new HotelCategoryProfitController()
