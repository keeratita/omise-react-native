const chai = require('chai');
const expect = chai.expect;
const should = chai.should();

// const config = require('./config');
const reactNativeOmise = require('../index');
const testHelper = require('./testHelper');

describe('Omise', function () {
    describe('#Sources', function () {

        beforeEach(function () {
            global.fetch = require('node-fetch');
            global.Headers = require('fetch-ponyfill')().Headers;
        });


        let sourceId = '';
        it('should be able to create a source', function (done) {
            testHelper.cleanAll();
            testHelper.setupMock('sources_create');

            let sourceDetails = {
                'type': 'internet_banking_bbl',
                'amount': 500000,
                'currency': 'thb'
            };

            reactNativeOmise.config('pkey_test_xxxxxxx', '2017-11-02');
            reactNativeOmise.createSource(sourceDetails)
                .then(function (resp) {
                    should.exist(resp.id);
                    sourceId = resp.id;
                    expect(sourceId).to.contains('src_test');
                    should.exist(resp.type);
                    expect(resp.type).to.contains('internet_banking_bbl');
                    done();
                }).catch(error => {
                    done(error);
                });
        });

        it('should not be able to create a source', function (done) {
            testHelper.cleanAll();
            testHelper.setupMock('sources_create_error_api_version');

            let sourceDetails = {
                'type': 'internet_banking_bbl',
                'amount': 500000,
                'currency': 'thb'
            };

            reactNativeOmise.config('pkey_test_xxxxxxx');
            reactNativeOmise.createSource(sourceDetails)
                .then(function (resp) {
                    should.exist(resp.object);
                    expect(resp.object).to.contains('error');
                    should.exist(resp.code);
                    expect(resp.code).to.contains('service_not_found');
                    done();
                }).catch(error => {
                    done(error);
                });
        });
    });
});