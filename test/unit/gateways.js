/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const gateways = require('../factories').gatewaysArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin gateways', () => {
  it('should return an array of gateways', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/gateways')
    .reply(200, gateways);

    return store.Gateways.All().then((gateways) => {
      assert.lengthOf(gateways, 2);
    });
  });

  it('should return a single gateway', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/gateways/braintree')
    .reply(200, gateways[0]);

    return store.Gateways.Get(gateways[0].slug).then((gateway) => {
      assert.propertyVal(gateway, 'slug', 'braintree');
    });
  });

  it('should enable a gateway', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put('/gateways/braintree', {
      data: {
        enabled: true
      }
    })
    .reply(200, {
      enabled: true
    });

    return store.Gateways.Enabled(gateways[0].slug, true).then((gateway) => {
      assert.propertyVal(gateway, 'enabled', true);
    });
  });

  it('should update a gateway', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put('/gateways/braintree', {
      data: {
        name: 'Braintree (updated)'
      }
    })
    .reply(200, {
      name: 'Braintree (updated)'
    });

    return store.Gateways.Update(gateways[0].slug, {
      name: 'Braintree (updated)'
    }).then((gateway) => {
      assert.propertyVal(gateway, 'name', 'Braintree (updated)');
    });
  });
});
