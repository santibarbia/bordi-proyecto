'use strict';

const app = require('../server/server');

module.exports = (token, cb) => {
  findToken(token)
  .then((result) => {
    let user = {};
    user.token = result;
    user.getUser = () => {
      return new Promise((resolve, reject) => {
        try {
          app.models.Users.findById(user.token.userId, (err, instance) => {
            if (err) {
              reject(err);
            }
            if (!instance) {
              const error = new Error();
              error.code = 'USER NOT FOUND';
              error.statusCode = 500;
              reject(error);
            }
            if (instance) {
              resolve(instance);
            }
          });
        } catch (error) {
          return error;
        }
      });
    };
    cb(null, user);
  })
  .catch(error => {
    cb(error, null);
  })
};

const findToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      app.models.AccessToken.findById(token, (err, instance) => {
        if (err) {
          reject(err);
        }
        if (!instance) {
          const error = new Error();
          error.code = 'TOKEN NOT FOUND';
          error.statusCode = 500;
          reject(error);
        }
        if (instance) {
          resolve(instance);
        }
      });
    } catch (error) {
      console.log('verifyToken 57', error);
      reject(error);
    }
  });
}