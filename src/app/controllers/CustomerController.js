import Customer from '../models/Customer'
import Coin from '../models/Coin'

class CustomerController {
  async index(req, res) {
    const customers = await Customer.findAll({
      attributes: ['name', 'surname', 'address', 'phone', 'country'],
      include: {
        model: Coin,
        as: 'coin',
        attributes: ['id', 'name'],
      },
    })

    return res.json(customers)
  }

  async store(req, res) {
    const { coin_id } = req.body

    const coinExists = await Coin.findOne({
      where: {
        id: coin_id,
      },
    })

    if (!coinExists) {
      res.status(400).json({ error: "Coin don't exist'" })
    }

    const customer = await Customer.create(req.body)

    return res.json(customer)
  }
}

export default new CustomerController()
