'use strict';

console.log('datasource production');

module.exports = {
  mySqlDS: {
    name: 'mySqlDS',
    connector: 'mysql',
    socketPath: process.env.INSTANCE_CONNECTION_NAME,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  storage: {
    name: 'storage',
    connector: 'loopback-component-storage',
    provider: 'google',
    keyFilename: './storage.json',
    projectId: 'production-tutticonvos',
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
