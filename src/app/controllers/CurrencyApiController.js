import axios from 'axios'
import convert from 'xml-to-json-promise'
import Coin from './app/models/Coin'

class CurrencyApi {
  async updateAllCoins(req, res) {
    try {
      const uri =
        'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
      const response = await axios.get(uri)
      const jsonObject = await convert.xmlDataToJSON(response.data)

      // array of currencies website ecb Europa
      const currencies =
        jsonObject['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube']

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
      return res.status(200).json(coins)
    } catch (err) {
      return res.status(500).send({
        message: err,
      })
    }
  }
}

export default new CurrencyApi()
