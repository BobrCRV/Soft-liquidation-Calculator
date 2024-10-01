const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
    try {
        const response = await axios.get('https://resources.curve.fi/crvusd/liquidations/#hard-liquidation-example');
        const $ = cheerio.load(response.data);
        
        // Извлекаем только элемент <canvas>
        const canvasElement = $('#crvHardLiq').toString();

        return {
            statusCode: 200,
            body: canvasElement,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: 'Ошибка при загрузке страницы.',
        };
    }
};
