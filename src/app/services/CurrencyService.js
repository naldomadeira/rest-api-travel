import api from '../../config/http';
import environment from '../../config/environment';
import convert from 'xml-to-json-promise';

class CurrencyService {
    /**
     * This method retrieve an array with all currencies according page of the
     * european banking
     * @returns array
     */
    async getCurrenciesToday() {
        const response = await api.get(
            environment.api.europeanBanking.endpoint
        );

        const currenciesJson = await convert.xmlDataToJSON(response.data);

        return currenciesJson['gesmes:Envelope']['Cube'][0]['Cube'][0][
            'Cube'
        ].map((item) => {
            const {
                $: { currency: symbol, rate: value },
            } = item;

            return {
                symbol,
                value,
            };
        });
    }
}

export default new CurrencyService();
