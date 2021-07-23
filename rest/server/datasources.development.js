'use strict';

require('dotenv').config();

console.log('datasource development');

module.exports = {
  mySqlDS: {
    name: 'mySqlDS',
    connector: 'mysql',
    hostname: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  storage: {
    name: 'storage',
    connector: 'loopback-component-storage',
    provider: 'google',
    keyFilename: './storage.json',
    projectId: 'bordi-proyectos',
    maxFileSize: '70000000',
  },
  myEmailDS: {
    name: 'myEmailDS',
    connector: 'mail',
    transports: [
      {
        type: 'SMTP',
        host: 'smtp.gmail.com',
        secure: 'true',
        port: '465',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    ],
  }
};
