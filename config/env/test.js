'use strict';

module.exports = {
  http: {
    port: 8080
  },
  db: {
    user: 'purchases_admin',
    password: 'dadada',
    database: 'purchases_test',
    host: 'localhost',
    force: true
  },
  cors: {
    maxAge: 60 * 60 * 24 * 7, // one week,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE'],
    headers: ['Accept', 'Content-type', 'Authorization'],
    origin: true
  },
  authentication: {
    //tokenExpiration: 20, // one week
    tokenExpiration: 60 * 60 * 24 * 7, // one week
    secrets: {
      sign: 'secret',
      password: 'secret'
    }
  },
  models: {
    roomLinks: {
      secrets: {
        token: 'secret'
      }
    }
  },
  tests: {
    authentication: {
      user: {
        name: 'Danil',
        username: 'Jonik',
        password: 'dadada'
      }
    },
    rooms: {
      room: {
        name: 'My room'
      }
    }
  }
};