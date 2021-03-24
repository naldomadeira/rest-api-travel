import Coin from '../models/Coin'
import axios from 'axios'
import convert from 'xml-to-json-promise'

class CoinController {
  async index(req, res) {
    const coins = await Coin.findAll()

    return res.json(coins)
  }

  async store(req, res) {
    const coin = await Coin.create(req.body)

    return res.json(coin)
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
