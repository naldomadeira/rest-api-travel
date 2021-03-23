import CategoryAgent from '../models/CategoryAgent'
import Agent from '../models/Agent'

class AgentController {
  async index(req, res) {
    const agents = await Agent.findAll({
      attributes: ['id', 'name', 'active', 'address'],
      include: {
        model: CategoryAgent,
        as: 'category',
        attributes: ['id', 'name'],
      },
    })

    return res.json(agents)
  }

  async store(req, res) {
    const { category_agent_id } = req.body

    const categoryExists = await CategoryAgent.findOne({
      where: {
        id: category_agent_id,
      },
    })

    if (!categoryExists) {
      res.status(400).json({ error: "Category don't exist'" })
    }

    const agent = await Agent.create(req.body)

    return res.json(agent)
  }
}

export default new AgentController()
