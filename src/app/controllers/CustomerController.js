import Customer from '../models/Customer'
import Coin from '../models/Coin'

class CustomerController {
  async index(req, res) {
    // #swagger.tags = ['Customer']

    try {
      const customers = await Customer.findAll({
        attributes: ['id', 'name', 'surname', 'address', 'phone', 'country'],
        include: {
          model: Coin,
          as: 'coin',
          attributes: ['id', 'name', 'symbol'],
        },
      })
      return res.status(200).json(customers)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['Customer']
    /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Customer.",
                schema: { $ref: "#/definitions/Customer" }
        } */
    const { coin_id } = req.body
    try {
      if (coin_id) {
        const coinExists = await Coin.findOne({
          where: {
            id: coin_id,
          },
        })

        if (!coinExists) {
          return res.status(400).json({ error: "Coin don't exist'" })
        }
      }
      const customer = await Customer.create(req.body)
      return res.status(201).json(customer)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['Customer']

    try {
      const customerExists = await Customer.findByPk(req.params.id, {
        include: [
          {
            model: Coin,
            as: 'coin',
            attributes: ['id', 'name', 'symbol'],
          },
        ],
      })
      if (!customerExists) {
        return res.status(400).json({ error: "Coin don't exist'" })
      }

      return res.status(200).json(customerExists)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['Customer']

    const id = req.params.id

    try {
      const customerExists = await Customer.findByPk(req.params.id)
      if (!customerExists) {
        return res.status(400).json({ error: "Customer don't exist'" })
      }

      await Customer.update(req.body, {
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
    // #swagger.tags = ['Customer']

    const id = req.params.id

    try {
      const customerExists = await Customer.findByPk(req.params.id)
      if (!customerExists) {
        return res.status(400).json({ error: "Customer don't exist'" })
      }

      await Customer.destroy({
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

export default new CustomerController()
