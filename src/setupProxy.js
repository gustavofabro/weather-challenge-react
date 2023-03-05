/* TODO: The same configuration should be done in the production build (e.g with nginx reverse proxy) */
/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware(
      '/api/geolocation',
      {
        target: process.env.REACT_APP_API_GEOCODING_CENSUS_LOCATIONS,
        pathRewrite: {
          '^/api/geolocation': ''
        },
        changeOrigin: true
      }
    )
  );

  app.use(
    createProxyMiddleware(
      '/api/weather',
      {
        target: process.env.REACT_APP_API_US_WEATHER,
        pathRewrite: {
          '^/api/weather': ''
        },
        changeOrigin: true
      }
    )
  );
};
