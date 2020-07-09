const axios = require('axios').default;

const { resolveUrl } = require('../util/helper');
const { services: { 'map-box': mapBoxConfig } } = require('../config');

const getCoordinatesByAddress = (address = '') => {
    if (typeof address !== 'string' || address.length === 0) {
        return Promise.reject(new Error('Invalid address.'));
    }

    const params = {
        access_token: mapBoxConfig.api_key,
        limit: 1,
    };

    const url = resolveUrl(mapBoxConfig.url, `mapbox.places/${encodeURIComponent(address)}.json`);

    return new Promise((resolve, reject) => {
        axios.get(url, { params })
            .then(response => {
                const possibleResults = response.data.features;

                if (possibleResults.length === 0) {
                    return reject(new Error('Could not identify the provided location.'));
                }

                const coordinates = possibleResults[0].center;
                const place = possibleResults[0].place_name;

                resolve({ place, longitude: coordinates[0], latitude: coordinates[1] });
            })
            .catch(error => reject(error));
    });
}

module.exports = {
    getCoordinatesByAddress,
};
