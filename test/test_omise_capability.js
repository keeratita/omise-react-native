var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

// var config = require('./config');
var reactNativeOmise = require('../index');
var testHelper = require('./testHelper');

describe('Omise', function () {
  describe('#Capability', function () {

    beforeEach(function () {
      global.fetch = require('node-fetch');
      global.Headers = require('fetch-ponyfill')().Headers;
    });


    var tokenId = '';
    it('should be able to get a capability', function (done) {
      testHelper.setupMock('capability_get');

      reactNativeOmise.config('pkey_test_xxxxxxx');
      reactNativeOmise.getCapabilities()
        .then(function (resp) {
          should.exist(resp.object);
          expect(resp.object).to.be.equal('capability');
          done();
        }).catch(error => {
          done(error);
        });
    });
  });
});