import Coin from '../models/Coin'

class CoinController {
  async index(req, res) {
    const coins = await Coin.findAll()

    return res.json(coins)
  }

  async store(req, res) {
    const coin = await Coin.create(req.body)

    return res.json(coin)
  }
}

export default new CoinController()
