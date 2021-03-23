import Coin from '../models/Coin'
import Exchange from '../models/Exchange'

class ExchangeController {
  async index(req, res) {
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
      ],
    })

    return res.json(exchanges)
  }

  async store(req, res) {
    const { coin_from, coin_to } = req.body

    if (coin_from === coin_to) {
      res.status(400).json({ error: 'currencies cannot be the same' })
    }

    const coinFromExists = await Coin.findOne({
      where: {
        id: coin_from,
      },
    })

    if (!coinFromExists) {
      res.status(400).json({ error: "Coin from don't exist'" })
    }

    const coinToExists = await Coin.findOne({
      where: {
        id: coin_to,
      },
    })

    if (!coinToExists) {
      res.status(400).json({ error: "Coin to don't exist'" })
    }

    const exchange = await Exchange.create(req.body)

    return res.json(exchange)
  }
}

export default new ExchangeController()
