/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');

const store = moltin.gateway({
  client_id: 'XXX',
});

const apiUrl = 'https://api.moltin.com';

describe('Moltin authentication', () => {
  it('should return an access token', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .post('/oauth/access_token', 'grant_type=implicit&client_id=XXX')
    .reply(200, {
      access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
      expires: '999999999999999999999',
    });

    return store.Authenticate().then((response) => {
      assert.propertyVal(response, 'access_token', 'a550d8cbd4a4627013452359ab69694cd446615a');
    });
  });

  // TODO: endpoint request should fire authenticate function if `access_token` is null
  // it('should reauthenticate if access_token is null', () => {
  //
  // });

  // TODO: endpoint request should refresh `access_token` if expired
  // it('should reauthenticate if access_token has expired', () => {
  //
  // });

  it('should throw an error when no client id is set', () => {
    // Clear the `client_id`
    store.config.client_id = '';

    assert.throws(() => store.Authenticate(), Error, 'You must have a client_id set');
  });
});
