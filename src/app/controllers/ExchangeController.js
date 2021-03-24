import Coin from '../models/Coin'
import Exchange from '../models/Exchange'
import Customer from '../models/Customer'

class ExchangeController {
  async index(req, res) {
    // #swagger.tags = ['Exchange']

    try {
      const exchanges = await Exchange.findAll({
        attributes: ['id', 'profit'],
        include: [
          {
            model: Coin,
            as: 'coin_from',
            attributes: ['id', 'name'],
          },
          {
            model: Coin,
            as: 'coin_to',
            attributes: ['id', 'name'],
          },
          {
            model: Customer,
            as: 'customer_id',
            attributes: ['id', 'name'],
          },
        ],
      })
      return res.status(200).json(exchanges)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async destroy(req, res) {
    // #swagger.tags = ['Exchange']

    const id = req.params.id

    try {
      const exchangeExists = await Customer.findByPk(req.params.id)
      if (!exchangeExists) {
        return res.status(400).json({ error: "Exchange don't exist'" })
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

export default new ExchangeController()
