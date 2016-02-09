'use strict';

var app = require('../server');
var models = require('../app/models');
var config = require('../config');

models.sequelize.sync({ force: config.db.force }).then(function () {

  app.listen(config.http.port, function () {
    console.log('Server is listening on ', config.http.port, ' port');
  });

});