var chai = require('chai');
var chaiHTTP = require('chai-http');
var server = require('../server');
var expect = chai.expect;

chai.use(chaiHTTP);

var request;

describe('Render 404 Page', function () {

    beforeEach(function () {
        request = chai.request(server);
    });

    it('should return 404 Status for an unknown route', function () {
        request.get('/test').end(function (err, res) {

            expect(res.status).to.equal(404);
        });
    });
});