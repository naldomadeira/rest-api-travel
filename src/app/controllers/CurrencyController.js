import CurrencyBusiness from '../business/CurrencyBusiness';

class CurrencyController {
    async updateAllCoins(req, res, next) {
        // #swagger.summary = 'retrieves and updates the coins values of current day'

        try {
            const coins = await CurrencyBusiness.updateAll();

            return res.status(200).json(coins);
        } catch (error) {
            next(error);
        }
    }
}

export default new CurrencyController();
