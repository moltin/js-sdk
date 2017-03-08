/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const items = require('../factories').cartItemsArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin cart', () => {
  beforeEach(() => {
    store.Cart.cartId = '3';

    cartId = store.Cart.cartId;
  });

  it('should return a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/carts/${cartId}`)
    .reply(200, {
      id: '3'
    });

    return store.Cart.Get().then((cart) => {
      assert.propertyVal(cart, 'id', '3');
    });
  });

  it('should return an array of cart items', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/carts/${cartId}/items`)
    .reply(200, items);

    return store.Cart.Contents().then((items) => {
      assert.lengthOf(items, 4);
    });
  });

  it('should add a product to the cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/carts/3/items')
    .reply(201, {
      product_id: '4',
      quantity: 2
    });

    return store.Cart.Insert('4', 2).then((item) => {
      assert.propertyVal(item, 'product_id', '4');
      assert.propertyVal(item, 'quantity', 2);
    });
  });

  it('should update the quantity of a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put('/carts/3/items/2')
    .reply(200, {
      product_id: '2',
      quantity: 6
    });

    return store.Cart.Quantity('2', 6).then((item) => {
      assert.propertyVal(item, 'product_id', '2');
      assert.propertyVal(item, 'quantity', 6);
    });
  });

  it('should delete a cart item', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/carts/${cartId}/items/2`)
    .reply(200, items);

    return store.Cart.Remove('2').then((items) => {
      assert.lengthOf(items, 4);
    });
  });

  it('should delete a cart', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/carts/${cartId}`)
    .reply(200, {});

    return store.Cart.Delete().then((cart) => {
      assert.deepEqual(cart, {});
    });
  });

  it('should create an order', () => {
    const order = {
      customer: {
        name: 'John Doe',
        email: 'john@doe.co'
      },
      billing_address: {
        first_name: 'John',
        last_name: 'Doe',
        line_1: '1 Test Street',
        postcode: 'NE1 6UF',
        county: 'Tyne & Wear',
        country: 'UK'
      },
      shipping_address: {
        first_name: 'John',
        last_name: 'Doe',
        line_1: '1 Test Street',
        postcode: 'NE1 6UF',
        county: 'Tyne & Wear',
        country: 'UK'
      }
    };

    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/carts/${cartId}/checkout`, {
      data: order
    })
    .reply(201, {
      id: '1',
      status: 'complete'
    });

    return store.Cart.Complete(order).then((order) => {
      assert.propertyVal(order, 'id', '1');
      assert.propertyVal(order, 'status', 'complete');
    });
  });
});
