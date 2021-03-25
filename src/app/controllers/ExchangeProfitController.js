import ExchangeProfit from '../models/ExchangeProfit'

class ExchangeProfitController {
  async store(req, res) {
    // #swagger.tags = ['ExchangeProfit']
    /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: "Adding new Exchance Profit.",
                schema: { $ref: "#/definitions/ExchangeProfit" }
        } */

    try {
      const exchangeProfit = await ExchangeProfit.create(req.body)
      return res.status(201).json(exchangeProfit)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['ExchangeProfit']

    try {
      const ExchangeProfitExist = await ExchangeProfit.findByPk(req.params.id)
      if (!ExchangeProfitExist) {
        return res.status(400).json({ error: "Exchange Profit don't exist'" })
      }

      return res.status(200).json(ExchangeProfitExist)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['ExchangeProfit']

    const id = req.params.id

    try {
      const exchangeProfitExist = await ExchangeProfit.findByPk(req.params.id)
      if (!exchangeProfitExist) {
        return res.status(400).json({ error: "Exchange profit don't exist'" })
      }

      await ExchangeProfit.update(req.body, {
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
    // #swagger.tags = ['ExchangeProfit']

    const id = req.params.id

    try {
      const exchangeProfitExist = await ExchangeProfit.findByPk(req.params.id)
      if (!exchangeProfitExist) {
        return res.status(400).json({ error: "Exchange profit don't exist'" })
      }

      await ExchangeProfit.destroy({
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

export default new ExchangeProfitController()
