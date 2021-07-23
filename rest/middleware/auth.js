'use strict';

const verifyIdToken = require('./verifyToken');

module.exports = () => {
  return (req, res, next) => {
    const token =
      req.headers.Authorization ||
      req.headers.authorization ||
      req.headers.Token ||
      req.headers.token ||
      req.headers.access_token ||
      req.access_token ||
      req.query.access_token;
    req.app.token = token;
    req.app.currentUser = undefined;
    if ((req.method === 'OPTIONS') || isAvailableRoute(req.url, req.method)) {
      req.app.needCheckMethod = false;
      next();
    } else {
      control(req, res, next);
    }
  };
};

const control = (req, res,  next) => {
  const token = req.app.token;
  if (token) {
    verifyIdToken(token, (err, result) => {
      if (err) {
        console.log('auth 31', err);
        const error = new Error();
        error.statusCode = 498;
        error.code = 'TOKEN INVALID';
        error.name = 'Invalid Token';
        error.message = 'Please refresh token';
        next(error);
      }
      result.getUser()
      .then(result => {
        const user = result;
        if (user) {
          if (user.status != 'ACTIVO') {
            const error = new Error();
            error.statusCode = 417;
            error.code = 'USER_UNAUTHORIZED';
            error.name = 'User unauthorized';
            error.message = 'Please sing in with other user';
            next(error);
          } else {
            req.headers['user'] = user;
            req.app.currentUser = user;
            req.app.needCheckMethod = true;
            next();
          }
        } else {
          const error = new Error();
          error.statusCode = 417;
          error.code = 'USER NOT FOUND';
          error.name = 'User not valid';
          error.message = 'Please sing in';
          next(error);
        }
      })
      .catch(error => {
        next(error);
      })
    });
  } else {
    console.log('no entro');
    const error = new Error();
    error.statusCode = 417;
    error.code = 'TOKEN NOT FOUND';
    error.name = 'Token not found';
    error.message = 'Please log in';
    next(error);
  }
}

function isAvailableRoute(url, method) {
  const config = require('../config.routes.json');
  return !config.protected.some((route) => url.match(route)) ||
    config.excluded.some((route) => (url.match(route['route']) && method.match(route['verb'])));
}
