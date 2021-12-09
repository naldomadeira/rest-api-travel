import axios from 'axios';
import convert from 'xml-to-json-promise';
import Coin from '../models/Coin';

class CurrencyApiController {
    async updateAllCoins(req, res) {
        // #swagger.summary = 'retrieves and updates the coins values of current day'

        try {
            const uri =
                'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
            const response = await axios.get(uri);
            const jsonObject = await convert.xmlDataToJSON(response.data);

            // array of currencies website ecb Europa
            const currencies =
                jsonObject['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube'];

            const coins = await Coin.findAll();

            // iterate all coins and updating in database
            await Promise.all(
                coins.map(async (coin) => {
                    const filterCurrency = await currencies.find((item) => {
                        return item.$.currency === coin.symbol;
                    });
                    if (filterCurrency) {
                        coin.value = filterCurrency['$'].rate;
                        await coin.save();
                    }
                })
            );
            return res.status(200).json(coins);
        } catch (err) {
            res.status(400).json({ error: "error update currencies'" });
        }
    }
}

export default new CurrencyApiController();
