module.exports = {
    resolveUrl(baseUrl = '', path = '') {
        const base = baseUrl.endsWith('/') ?
            baseUrl.replace(/\/$/, '') :
            baseUrl;

        return `${base}/${path.replace(/^\//, '')}`;
    },
    asyncRouter(routerHandler) {
        return (...args) => {
            const next = args.length > 2 ? args[args.length - 1] : console.error;

            return Promise.resolve(routerHandler(...args)).catch(next);
        };
    }
};
