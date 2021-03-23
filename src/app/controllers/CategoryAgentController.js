import CategoryAgent from '../models/CategoryAgent'

class CategoryAgentController {
  async index(req, res) {
    const categories = await CategoryAgent.findAll({
      include: ['agents'],
    })

    return res.json(categories)
  }

  async store(req, res) {
    const category = await CategoryAgent.create(req.body)

    return res.json(category)
  }
}

export default new CategoryAgentController()
