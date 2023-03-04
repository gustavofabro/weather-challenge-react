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
