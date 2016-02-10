'use strict';

var expect = require('chai').expect;

module.exports = function (request, config, share) {
  return {
    createRoom: function (options, done) {
      let data = {name: options.roomName};

      request
        .post('/rooms')
        .send(data)
        .set('Authorization', options.token)
        .expect(function (res) {
          expect(res.body).to.be.an('object');
          expect(res.body.response).to.be.an('object');
          expect(res.body.response.name).to.equal(options.roomName);
        })
        .expect(function (res) {
          share.rooms[options.field] = res.body.response;
        })
        .expect(200, done);
    },
    generateApproveToken: function (options, done) {
      let roomId = options.roomId;

      request
        .get(`/rooms/${roomId}/approve`)
        .set('Authorization', options.token)
        .expect(function (res) {
          expect(res.body).to.be.an('object');
          expect(res.body.response).to.be.an('string');
        })
        .expect(function (res) {
          share.rooms[options.field] = res.body.response;
        })
        .expect(200, done);
    }
  };
};