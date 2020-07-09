const { getCoordinatesByAddress } = require('./map-box');
const { getWeatherDataUsingCoordinates } = require('./dark-sky');

module.exports = async (address) => {
    try {
        const { longitude, latitude, place } = await getCoordinatesByAddress(address);

        const result = await getWeatherDataUsingCoordinates(longitude, latitude);

        return {
            location: place,
            summary: result.daily.data[0].summary,
            currentTemperature: result.currently.temperature,
            currentPrecipitationProbability: (result.currently.precipProbability * 100) + '%'
        };
    } catch (error) {console.log(error);
        if (error.syscall === 'getaddrinfo' || error.code === 'ENOTFOUND') {
            return Promise.reject(
                new Error('Unable to connect to our Weather service. Please check your network.')
            );
        }

        return Promise.reject(error);
    }
};
