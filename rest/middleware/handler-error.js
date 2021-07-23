'use strict';

const routes = require('../routes.json');
const app = require('../server/server');

module.exports = function() { 
  return function logError(err, req, res, next) { 
    if (err) {
      let newarray = req.originalUrl.toString().split('/');
      newarray.shift();
      const route = newarray.reverse().pop()
      if (routes.includes(route)) {
        res.redirect(`/`);
      } else {
        console.log('handler-error 15', err);
        throw err;
      }
    }
    next();
  };
};