const axios = require('axios');

const { resolveUrl } = require('../util/helper');
const { services: { 'dark-sky': darkSkyConfig } } = require('../config');

const getWeatherDataUsingCoordinates = (longitude, latitude) => {
    const url = resolveUrl(darkSkyConfig.url, 'forecast') + `/${darkSkyConfig.api_key}/${longitude},${latitude}`;

    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => resolve(response.data))
            .catch(error => {
                if (error.response.status === 400) {
                    return reject(new Error('Could not identify the provided location.'));
                }

                reject(error)
            });
    });
}

module.exports = {
    getWeatherDataUsingCoordinates,
}