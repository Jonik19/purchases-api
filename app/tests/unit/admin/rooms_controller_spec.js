'use strict';

var expect = require('chai').expect;
var roomsHelper = require('./room_helper');

module.exports = function (request, config, share) {
  let helper = roomsHelper();

  share.rooms = {};

  describe('RoomsController', function () {

    describe('#index', function () {

      it('returns list of user rooms', function (done) {
        request
          .get('/rooms')
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.items).to.be.an('array');
          })
          .expect(200, done);
      });

    });

    describe('#create', function () {

      it('creates room by user and returns newly created room (with passed name of room)', function (done) {
        let data = config.tests.rooms.room;

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
            share.rooms.id = res.body.response.id;
          })
          .expect(200, done);
      });

      it('returns 400 status with error object (when name of room is not passed)', function (done) {
        let data = {name: null};

        request
          .post('/rooms')
          .send(data)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

    });

    describe('#show', function () {

      it('returns room by specified id (when room is existed)', function (done) {
        let roomId = share.rooms.id;

        request
          .get(`/rooms/${roomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.response).to.be.an('object');
            expect(res.body.response.name).to.equal(config.tests.rooms.room.name);
          })
          .expect(200, done);
      });

      it('return 400 error (when room with specified id is not exist)', function (done) {
        let roomId = 'incorrect_room_id';

        request
          .get(`/rooms/${roomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(400, done);
      });

      it('return 403 error (when user is not in that room)', function (done) {

        //TODO: create second room to pass this test. Create helper to do it.


        let notUserRoomId = share.rooms.notUserRoomId;

        request
          .get(`/rooms/${roomId}`)
          .set('Authorization', share.authentication.token)
          .expect(function (res) {
            expect(res.body).to.be.an('object');
            expect(res.body.error).to.be.an('object');
          })
          .expect(403, done);
      });

    });

  });

};