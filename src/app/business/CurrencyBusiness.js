import CurrencyService from '../services/CurrencyService';
import CoinBusiness from '../business/CoinBusiness';

class CurrencyBusiness {
    async updateAll() {
        const currenciesToday = await CurrencyService.getCurrenciesToday();

        const coins = await CoinBusiness.index();

        // iterate all coins and updating in database
        return await Promise.all(
            coins.map((coin) => {
                const currencyFiltered = currenciesToday.find((item) => {
                    return item.symbol === coin.symbol;
                });

                if (currencyFiltered) {
                    coin.value = this.convertToEuro(currencyFiltered.value);
                    coin.save();
                }

                return coin;
            })
        );
    }

    /**
     * This method convert currency value to Euro
     * @return float
     */
    convertToEuro(currencyValue) {
        const valueEuroReference = 1;

        return parseFloat(valueEuroReference / currencyValue);
    }
}

export default new CurrencyBusiness();
