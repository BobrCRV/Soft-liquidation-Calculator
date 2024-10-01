const axios = require('axios');

exports.handler = async (event) => {
    try {
        const response = await axios.get('https://resources.curve.fi/crvusd/liquidations/#hard-liquidation-example');

        return {
            statusCode: 200,
            body: response.data, // Возвращаем весь HTML-код страницы
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Ошибка при загрузке страницы.',
        };
    }
};
