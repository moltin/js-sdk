/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const orders = require('../factories').ordersArray;

const store = moltin.gateway({
  client_id: 'XXX',
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin orders', () => {
  it('should return an array of orders', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/orders')
    .reply(200, orders);

    return store.Orders.All().then((response) => {
      assert.lengthOf(response, 4);
      assert.propertyVal(response[0], 'id', 'order-1');
    });
  });

  it('should return a single order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/orders/order-1')
    .reply(200, orders[0]);

    return store.Orders.Get(orders[0].id).then((response) => {
      assert.propertyVal(response, 'id', 'order-1');
      assert.propertyVal(response, 'status', 'complete');
    });
  });

  it('should complete a payment for an order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/orders/order-2/payments', {
      data: {
        gateway: 'braintree',
        method: 'purchase',
        customer_id: '3',
      },
    })
    .reply(201, {
      status: 'complete',
    });

    return store.Orders.Payment(orders[1].id, {
      gateway: 'braintree',
      method: 'purchase',
      customer_id: '3',
    }).then((response) => {
      assert.propertyVal(response, 'status', 'complete');
    });
  });
});
