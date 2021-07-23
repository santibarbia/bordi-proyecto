'use strict';

console.log('config production');

module.exports = {
  restApiRoot: '/api',
  hostname: process.env.API_HOST,
  port: process.env.API_PORT,
  remoting: {
    context: false,
    rest: {
      handleErrors: false,
      normalizeHttpPath: false,
      xml: false,
    },
    json: {
      strict: false,
      limit: '100kb',
    },
    urlencoded: {
      extended: true,
      limit: '100kb',
    },
    cors: false
  },
};
