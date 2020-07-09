const express = require('express');
const expressHandlebars = require('express-handlebars');

require('dotenv').config();

const config = require('./config');
const { asyncRouter } = require('./util/helper');
const getWeatherByAddress = require('./services/weather');

const app = express();
const port = config.app.port;

const hbs = expressHandlebars.create({
    extname: '.hbs'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { title: config.app.name });
});

app.get('/weather', asyncRouter(async (req, res) => {
    const address = req.query.search;

    if (! address || address.length === 0) {
        return res.status(400).send({ status: false, error: 'An address or location is required.' });
    }

    if (address.split(',').length < 2) {
        return res.status(400).send({ status: false, error: 'The address or location must be of the format "Location, Country"' });
    }

    if (address.length > 255) {
        return res.status(400).send({ status: false, error: 'The address or location must not be more than 255 characters long.' });
    }

    try {
        const {
            summary,
            location,
            currentTemperature,
            currentPrecipitationProbability,
        } = await getWeatherByAddress(address);

        const forecastSummary = `${summary}. It is currently ${currentTemperature} degrees out. There is a ${currentPrecipitationProbability} chance of rain.`;

        res.status(200).send({ status: true, data: { address, forecastSummary, location }});
    } catch (error) {
        res.status(400).send({ status: false, error: error.message });
    }
}));

app.get('*', (req, res) => {
    res.render('errors/404', { title: '404' });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
