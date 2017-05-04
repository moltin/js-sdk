/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const currencies = require('../factories').currenciesArray;

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin currencies', () => {
  // Instantiate a Moltin client before each test
  beforeEach(() => {
    Moltin = moltin.gateway({
      client_id: 'XXX',
    });
  });

  it('should return an array of currencies', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/currencies')
    .reply(200, currencies);

    return Moltin.Currencies.All()
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a single currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/currencies/1')
    .reply(200, currencies[0]);

    return Moltin.Currencies.Get('1')
    .then((response) => {
      assert.propertyVal(response, 'code', 'USD');
    });
  });

  it('should create a currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/currencies', {
      data: {
        code: 'USD',
      },
    })
    .reply(201, {
      code: 'USD',
    });

    return Moltin.Currencies.Create({
      code: 'USD',
    })
    .then((response) => {
      assert.propertyVal(response, 'code', 'USD');
    });
  });

  it('should update a currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/currencies/1', {
      data: {
        code: 'GBP',
      },
    })
    .reply(200, {
      code: 'GBP',
    });

    return Moltin.Currencies.Update('1', {
      code: 'GBP',
    })
    .then((response) => {
      assert.propertyVal(response, 'code', 'GBP');
    });
  });

  it('should delete a currency', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/currencies/1')
    .reply(200, {
      type: 'currency',
      id: '1',
    });

    return Moltin.Currencies.Delete('1')
    .then((response) => {
      assert.propertyVal(response, 'id', '1');
    });
  });

  it('should return the active currency', () => {
    Moltin.Currencies.Set(currencies[2].code).then(() => {
      Moltin.Currencies.Active()
      .then((response) => {
        assert.equal(response, 'YEN');
      });
    });
  });

  it('should set the active currency', () => {
    Moltin.Currencies.Set(currencies[1].code)
    .then((response) => {
      assert.equal(response, 'GBP');
    });
  });
});
