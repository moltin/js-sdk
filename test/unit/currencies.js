/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const currencies = require('../factories').currenciesArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin currencies', () => {
  it('should return an array of currencies', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/currencies')
    .reply(200, currencies);

    return store.Currencies.List().then((currencies) => {
      assert.lengthOf(currencies, 4);
    });
  });

  it('should return a single currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/currencies/1')
    .reply(200, currencies[0]);

    return store.Currencies.Get('1').then((currency) => {
      assert.propertyVal(currency, 'code', 'USD');
    });
  });

  it('should create a currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/currencies')
    .reply(201, {
      code: 'USD'
    });

    return store.Currencies.Create({
      code: 'USD'
    }).then((currency) => {
      assert.propertyVal(currency, 'code', 'USD');
    });
  });

  it('should update a currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put('/currencies/1')
    .reply(200, {
      code: 'GBP'
    });

    return store.Currencies.Update('1', {
      code: 'GBP'
    }).then((currency) => {
      assert.propertyVal(currency, 'code', 'GBP');
    });
  });

  it('should delete a currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete('/currencies/1')
    .reply(200, {
      type: 'currency',
      id: '1'
    });

    return store.Currencies.Delete('1').then((currency) => {
      assert.propertyVal(currency, 'id', '1');
    });
  });

  it('should return the active currency', () => {
    return store.Currencies.Set(currencies[2].code).then(() => {
      return store.Currencies.Active().then((currency) => {
        assert.equal(currency, 'YEN');
      });
    });
  });

  it('should set the active currency', () => {
    return store.Currencies.Set(currencies[1].code).then((currency) => {
      assert.equal(currency, 'GBP');
    });
  });
});
