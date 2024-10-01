const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000;

// Прокси для получения содержимого с другого сайта
app.get('/proxy', async (req, res) => {
    try {
        // Получаем содержимое целевой страницы
        const { data } = await axios.get('https://resources.curve.fi/crvusd/liquidations/#hard-liquidation-example');
        
        // Парсим HTML с помощью Cheerio
        const $ = cheerio.load(data);
        
        // Извлекаем нужный элемент <canvas>
        const canvasElement = $('#crvHardLiq').toString();

        // Отправляем найденный элемент в ответе
        res.send(canvasElement);
    } catch (error) {
        res.status(500).send('Ошибка при загрузке страницы.');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

