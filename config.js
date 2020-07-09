module.exports = {
    app: {
        name: process.env.APP_NAME || "Weather App",
        port: process.env.PORT || 3000,
    },

    services: {
        "dark-sky": {
            url: process.env.DARKSKY_URL,
            api_key: process.env.DARKSKY_API_KEY,
        },

        "map-box": {
            url: process.env.MAPBOX_URL,
            api_key: process.env.MAPBOX_API_KEY,
        }
    }
};
