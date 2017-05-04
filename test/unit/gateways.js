/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const gateways = require('../factories').gatewaysArray;

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin gateways', () => {
  // Instantiate a Moltin client before each test
  beforeEach(() => {
    Moltin = moltin.gateway({
      client_id: 'XXX',
    });
  });

  it('should return an array of gateways', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/gateways')
    .reply(200, gateways);

    return Moltin.Gateways.All()
    .then((response) => {
      assert.lengthOf(response, 2);
    });
  });

  it('should return a single gateway', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/gateways/braintree')
    .reply(200, gateways[0]);

    return Moltin.Gateways.Get(gateways[0].slug)
    .then((response) => {
      assert.propertyVal(response, 'slug', 'braintree');
    });
  });

  it('should enable a gateway', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/gateways/braintree', {
      data: {
        enabled: true,
      },
    })
    .reply(200, {
      enabled: true,
    });

    return Moltin.Gateways.Enabled(gateways[0].slug, true)
    .then((response) => {
      assert.propertyVal(response, 'enabled', true);
    });
  });

  it('should update a gateway', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/gateways/braintree', {
      data: {
        name: 'Braintree (updated)',
      },
    })
    .reply(200, {
      name: 'Braintree (updated)',
    });

    return Moltin.Gateways.Update(gateways[0].slug, {
      name: 'Braintree (updated)',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'Braintree (updated)');
    });
  });
});
