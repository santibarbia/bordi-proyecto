'use strict';

const app = require('../server/server');

module.exports  = () => {
  return (req, res, next) => {
    findSuperUser()
    .then(result => {
      next();
    })
    .catch(error => {
      if (error.code === 'USER NOT FOUND') {
        createSuperUser()
        .then(userCreated => {
          next();
        })
        .catch(err => {
          throw err
        })
      } else {
        throw error;
      }
    })
  }
};

const findSuperUser = () => {
  return new Promise((resolve, reject) => {
    try {
      app.models.Users.findOne({where: {username: 'superroot'}}, (err, instance) => {
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
      console.log('findSuperUser 34', error);
      reject(error);
    }
  });
}

const createSuperUser = () => {
  return new Promise((resolve, reject) => {
    try {
      const userToCreate = {
        username: 'superroot',
        password: 'Freelance@123',
        typeRole: 'ADMIN',
        status: 'ACTIVO'
      };
      app.models.Users.create(userToCreate, (err, instance) => {
        if (err) {
          reject(err);
        }
        if (!instance) {
          const error = new Error();
          error.code = 'USER NOT CREATE';
          error.statusCode = 500;
          reject(error);
        }
        if (instance) {
          resolve(instance);
        }
      });
    } catch (error) {
      console.log('findSuperUser 62', error);
      reject(error);
    }
  });
}