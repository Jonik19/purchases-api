'use strict';

var expect = require('chai').expect;

module.exports = function (request, config, share) {
  return {
    createRoom: function (roomName, fieldInShare) {
      let data = {name: roomName};

      request
        .post('/rooms')
        .send(data)
        .set('Authorization', share.authentication.token)
        .expect(function (res) {
          expect(res.body).to.be.an('object');
          expect(res.body.response).to.be.an('object');
          expect(res.body.response.name).to.equal(data.name);
        })
        .expect(function (res) {
          share.rooms[fieldInShare] = res.body.response.id;
        })
        .expect(200, done);
    }
  };
};