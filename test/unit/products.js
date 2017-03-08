/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const products = require('../factories').productsArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin products', () => {
  it('should return an array of products', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/products')
    .reply(200, products);

    return store.Products.List().then((products) => {
      assert.lengthOf(products, 4);
    });
  });

  it('should return a single product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/products/1')
    .reply(200, products[0]);

    return store.Products.Get(1).then((product) => {
      assert.propertyVal(product, 'name', 'Product 1');
    });
  });

  it('should create a new product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/products')
    .reply(201, {
      name: 'A new product'
    });

    return store.Products.Create({
      name: 'A new product'
    }).then((product) => {
      assert.propertyVal(product, 'name', 'A new product');
    });
  });

  it('should update a product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put('/products/1', {
      data: {
        name: 'Updated product name'
      }
    })
    .reply(200, {
      name: 'Updated product name'
    });

    return store.Products.Update(1, {
      name: 'Updated product name'
    }).then((product) => {
      assert.propertyVal(product, 'name', 'Updated product name');
    });
  });

  it('should delete a product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete('/products/1')
    .reply(200, {
      type: 'product',
      id: '1'
    });

    return store.Products.Delete(1).then((product) => {
      assert.propertyVal(product, 'id', '1');
    });
  });
});
