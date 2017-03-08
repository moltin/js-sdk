/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const orders = require('../factories').ordersArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin orders', () => {
  it('should return an array of orders', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/orders')
    .reply(200, orders);

    return store.Orders.List().then((orders) => {
      assert.lengthOf(orders, 4);
      assert.propertyVal(orders[0], 'id', 'order-1');
    });
  });

  it('should return a single order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/orders/${orders[0].id}`)
    .reply(200, orders[0]);

    return store.Orders.Get(orders[0].id).then((order) => {
      assert.propertyVal(order, 'id', 'order-1');
      assert.propertyVal(order, 'status', 'complete');
    });
  });

  it('should complete a payment for an order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/orders/${orders[1].id}/payments`, {
      data: {
        gateway: 'braintree',
        method: 'purchase',
        customer_id: '3'
      }
    })
    .reply(201, {
      status: 'complete'
    });

    return store.Orders.Payment(orders[1].id, {
      gateway: 'braintree',
      method: 'purchase',
      customer_id: '3'
    }).then((order) => {
      assert.propertyVal(order, 'status', 'complete');
    });
  });
});
