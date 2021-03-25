import CategoryAgent from '../models/CategoryAgent'
import Agent from '../models/Agent'

class CategoryAgentController {
  async index(req, res) {
    // #swagger.tags = ['CategoryAgent']
    try {
      const categories = await CategoryAgent.findAll({
        include: [
          {
            model: Agent,
            as: 'agents',
            attributes: ['id', 'name'],
          },
        ],
      })
      return res.status(200).json(categories)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['CategoryAgent']
    /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new CategoryAgent.",
                schema: { $ref: "#/definitions/CategoryAgent" }
        } */

    try {
      const category = await CategoryAgent.create(req.body)
      return res.status(201).json(category)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['CategoryAgent']

    try {
      const categoryAgentExist = await CategoryAgent.findByPk(req.params.id, {
        include: [
          {
            model: Agent,
            as: 'agents',
            attributes: ['id', 'name'],
          },
        ],
      })
      if (!categoryAgentExist) {
        return res.status(400).json({ error: "Category don't exist'" })
      }

      return res.status(200).json(categoryAgentExist)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['CategoryAgent']

    const id = req.params.id

    try {
      const categoryAgentExist = await CategoryAgent.findByPk(req.params.id)
      if (!categoryAgentExist) {
        return res.status(400).json({ error: "Category don't exist'" })
      }

      await CategoryAgent.update(req.body, {
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
    // #swagger.tags = ['CategoryAgent']

    const id = req.params.id

    try {
      const categoryAgentExist = await CategoryAgent.findByPk(req.params.id)
      if (!categoryAgentExist) {
        return res.status(400).json({ error: "Category don't exist'" })
      }

      await CategoryAgent.destroy({
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

export default new CategoryAgentController()
