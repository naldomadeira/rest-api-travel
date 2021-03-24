import CategoryAgent from '../models/CategoryAgent'
import Agent from '../models/Agent'

class AgentController {
  async index(req, res) {
    // #swagger.tags = ['Agent']

    try {
      const agents = await Agent.findAll({
        attributes: ['id', 'name', 'active', 'address'],
        include: {
          model: CategoryAgent,
          as: 'category',
          attributes: ['id', 'name'],
        },
      })
      return res.status(200).json(agents)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['Agent']

    const { category_agent_id } = req.body
    try {
      if (category_agent_id) {
        const categoryExists = await CategoryAgent.findOne({
          where: {
            id: category_agent_id,
          },
        })

        if (!categoryExists) {
          return res.status(400).json({ error: "Category don't exist'" })
        }
      }
      const agent = await Agent.create(req.body)
      return res.status(201).json(agent)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['Agent']

    try {
      const agentExists = await Agent.findByPk(req.params.id, {
        include: [
          {
            model: CategoryAgent,
            as: 'category',
            attributes: ['id', 'name'],
          },
        ],
      })
      if (!agentExists) {
        return res.status(400).json({ error: "Agent don't exist'" })
      }

      return res.status(200).json(agentExists)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['Agent']
    const id = req.params.id

    try {
      const agentExists = await Agent.findByPk(req.params.id)
      if (!agentExists) {
        return res.status(400).json({ error: "Agent don't exist'" })
      }

      await Agent.update(req.body, {
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
    // #swagger.tags = ['Agent']
    const id = req.params.id

    try {
      const agentExists = await Agent.findByPk(req.params.id)
      if (!agentExists) {
        return res.status(400).json({ error: "Agent don't exist'" })
      }

      await Agent.destroy({
        where: { id: id },
      })

      return res.status(204).json({
        message: `item with id=${id} was deleted successfully!`,
      })
    } catch (err) {
      return res.status(500).send({
        message: `Could not delete item with id=${id}`,
      })
    }
  }
}

export default new AgentController()
