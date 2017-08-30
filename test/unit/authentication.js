/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const MoltinGateway = require('../../dist/moltin.cjs.js').gateway;

const apiUrl = 'https://api.moltin.com';

describe('Moltin authentication', () => {
  it('should return an access token', () => {
    Moltin = MoltinGateway({
      client_id: 'XXX',
    });

    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .post('/oauth/access_token', {
      grant_type: 'implicit',
      client_id: 'XXX',
    })
    .reply(200, {
      access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
      expires: '999999999999999999999',
    });

    return Moltin.Authenticate()
    .then((response) => {
      assert.propertyVal(response, 'access_token', 'a550d8cbd4a4627013452359ab69694cd446615a');
    });
  });

  // TODO: endpoint request should fire authenticate function if `access_token` is null
  // it('should reauthenticate if access_token is null', () => {
  //
  // });

  it('should throw an error when no client id is set', () => {
    // Clear the `client_id`
    Moltin = MoltinGateway({
      client_id: '',
    });

    assert.throws(() => Moltin.Authenticate(), Error, /You must have a client_id set/);
  });

  it('should fallback to default API host if host is undefined during instantiation', () => {
    // Clear the `host`
    Moltin = MoltinGateway({
      client_id: 'XXX',
      host: null,
    });

    assert.equal(Moltin.config.host, 'api.moltin.com');
  });

  it('should use a custom API host', () => {
    // Set a custom `host` when instantiating
    Moltin = MoltinGateway({
      client_id: 'XXX',
      host: 'api.test.test',
    });

    assert.equal(Moltin.config.host, 'api.test.test');
  });
});
