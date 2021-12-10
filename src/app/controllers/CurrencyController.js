import CurrencyBusiness from '../business/CurrencyBusiness';

class CurrencyController {
    async updateAllCoins(req, res) {
        // #swagger.summary = 'retrieves and updates the coins values of current day'

        try {
            const coins = await CurrencyBusiness.updateAll();

            return res.status(200).json(coins);
        } catch (err) {
            res.status(400).json({
                error: 'error when trying update currencies',
            });
        }
    }
}

export default new CurrencyController();
