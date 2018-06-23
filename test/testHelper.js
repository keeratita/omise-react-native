
'use strict';

module.exports = {
    setupMock: function (name) {
        if (process.env.NOCK_OFF !== 'true') {
            require(['./mocks', name].join('/'));
        }
    },
    cleanAll: function() {
        if (process.env.NOCK_OFF !== 'true') {
            const nock = require("nock");
            nock.cleanAll();
        }
    }
};