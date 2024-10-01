const puppeteer = require('puppeteer');

exports.handler = async (event) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('https://resources.curve.fi/crvusd/liquidations/#hard-liquidation-example', { waitUntil: 'networkidle2' });
        const canvasElement = await page.evaluate(() => {
            const canvas = document.getElementById('crvHardLiq');
            return canvas ? canvas.outerHTML : null;
        });

        await browser.close();

        return {
            statusCode: 200,
            body: canvasElement || 'Canvas not found',
        };
    } catch (error) {
        await browser.close();
        return {
            statusCode: 500,
            body: 'Error fetching the page.',
        };
    }
};
