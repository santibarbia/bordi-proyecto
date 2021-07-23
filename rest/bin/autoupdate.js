'use strict';

var app = require('../server/server');
var ds = app.dataSources.mySqlDS;

ds.autoupdate(function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
