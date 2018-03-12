var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

// var config = require('./config');
var reactNativeOmise = require('../index');
var testHelper = require('./testHelper');

describe('Omise', function () {
    describe('#Tokens', function () {

        beforeEach(function () {
            global.fetch = require('node-fetch');
            global.Headers = require('fetch-ponyfill')().Headers;
        });


        var tokenId = '';
        it('should be able to create a token', function (done) {
            testHelper.setupMock('tokens_create');

            var cardDetails = {
                'card': {
                    'name': 'JOHN DOE',
                    'city': 'Bangkok',
                    'postal_code': 10320,
                    'number': '4242424242424242',
                    'expiration_month': 10,
                    'expiration_year': 2018,
                    'security_code': 123,
                },
            };

            reactNativeOmise.config('pkey_test_xxxxxxx');
            reactNativeOmise.createToken(cardDetails)
                .then(function (resp) {
                    should.exist(resp.id);
                    tokenId = resp.id;
                    expect(tokenId).to.contains('tokn_test');
                    should.exist(resp.card.id);
                    var cardId = resp.card.id;
                    expect(cardId).to.contains('card_test');
                    done();
                }).catch(error => {
                    done(error);
                });
        });
    });
});