const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  instrumentationKey: 'f7802948-ea47-419e-9224-42b78ae39f21',
  development: {
    root: rootPath,
    app: {
      name: 'Fractals.io (dev)'
    },
    port: process.env.PORT || 3000,
  },

  test: {
    root: rootPath,
    app: {
      name: 'Fractals.io (test)'
    },
    port: process.env.PORT || 3000,
  },

  production: {
    root: rootPath,
    app: {
      name: 'Fractals.io  (prod)'
    },
    port: process.env.PORT || 3000,
  }
};

module.exports = config[env];
