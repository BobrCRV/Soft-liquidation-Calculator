const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
    try {
        const response = await axios.get('https://resources.curve.fi/crvusd/liquidations/#hard-liquidation-example');
        const $ = cheerio.load(response.data);
        
        // Извлекаем родительский div
        const divElement = $('div#crvHardLiq').parent().html(); // Извлекаем содержимое родителя

        return {
            statusCode: 200,
            body: divElement,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Ошибка при загрузке страницы.',
        };
    }
};
