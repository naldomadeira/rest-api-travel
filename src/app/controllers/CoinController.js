import Coin from '../models/Coin'
import axios from 'axios'
import convert from 'xml-to-json-promise'

class CoinController {
  async index(req, res) {
    // #swagger.tags = ['Coin']
    try {
      const coins = await Coin.findAll()
      return res.status(200).json(coins)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieve all items` })
    }
  }

  async store(req, res) {
    // #swagger.tags = ['Coin']
    try {
      const coin = await Coin.create(req.body)
      return res.status(201).json(coin)
    } catch (err) {
      return res.status(500).send({ message: `Erro store a item` })
    }
  }

  async show(req, res) {
    // #swagger.tags = ['Coin']
    try {
      const coinExists = await Coin.findByPk(req.params.id)
      if (!coinExists) {
        return res.status(400).json({ error: "Coin don't exist'" })
      }

      return res.status(200).json(coinExists)
    } catch (err) {
      return res.status(500).send({ message: `Erro retrieving a item` })
    }
  }

  async update(req, res) {
    // #swagger.tags = ['Coin']
    const id = req.params.id

    try {
      const coinExists = await Coin.findByPk(req.params.id)
      if (!coinExists) {
        return res.status(400).json({ error: "Coin don't exist'" })
      }

      await Coin.update(req.body, {
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
    // #swagger.tags = ['Coin']
    const id = req.params.id

    try {
      const coinExists = await Coin.findByPk(req.params.id)
      if (!coinExists) {
        return res.status(400).json({ error: "Coin don't exist'" })
      }

      await Coin.destroy({
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

  async updateAllCurrency(req, res) {
    const uri = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
    const response = await axios.get(uri)
    const jsonObject = await convert.xmlDataToJSON(response.data)

    /**
     * Result receives the array of objects with the list of currencies and values
     */
    const result = jsonObject['gesmes:Envelope']['Cube'][0]['Cube'][0]

    /**
     * variable date that shows the day of the search
     */
    const date = result['$']['time']
    console.log(`Date: ${date}`)

    // array of currencies do website
    const currencies = result['Cube']

    const coins = await Coin.findAll()

    // iterate all coins and updating in database
    coins.map((coin) => {
      const filterCurrency = currencies.find((item) => {
        return item.$.currency === coin.symbol
      })
      if (filterCurrency) {
        coin.value = filterCurrency['$'].rate
        coin.save()
      }
    })

    return res.json(coins)
  }
}

export default new CoinController()
