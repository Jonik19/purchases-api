'use strict';

var expect = require('chai').expect;

module.exports = function (request, config, share) {
  return {
    createUser: function (data, done) {
      const user = config.tests.authentication.user;

      request
        .post('/sign-up')
        .send(data.user)
        .expect(function (res) {


          expect(res.body.response).to.be.a('object');
          expect(res.body.response.user).to.be.a('object');
          expect(res.body.response.token).to.be.a('string');
        })
        .expect(function (res) {
          // TODO: move token definition to function
          share.authentication[data.field] = `Bearer ${res.body.response.token}`;
        })
        .expect(200, done);
    }
  };
};