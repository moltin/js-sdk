/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const collections = require('../factories').collectionsArray;
const products = require('../factories').productsArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin collections', () => {
  it('should return an array of collections', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/collections')
    .reply(200, collections);

    return store.Collections.All().then((collections) => {
      assert.lengthOf(collections, 4);
    });
  });

  it('should return a single collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/collections/1')
    .reply(200, collections[0]);

    return store.Collections.Get(1).then((collection) => {
      assert.propertyVal(collection, 'name', 'Collection 1');
    });
  });

  it('should create a new collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/collections')
    .reply(201, {
      name: 'A new collection'
    });

    return store.Collections.Create({
      name: 'A new collection'
    }).then((collection) => {
      assert.propertyVal(collection, 'name', 'A new collection');
    });
  });

  it('should update a collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put('/collections/1')
    .reply(200, {
      name: 'Updated collection name'
    });

    return store.Collections.Update('1', {
      name: 'Updated collection name'
    }).then((collection) => {
      assert.propertyVal(collection, 'name', 'Updated collection name');
    });
  });

  it('should delete a collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete('/collections/1')
    .reply(200, {
      type: 'collection',
      id: '1'
    });

    return store.Collections.Delete('1').then((collection) => {
      assert.propertyVal(collection, 'id', '1');
    });
  });

  it('should create a new product-collection relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/products/1/relationships/collections', {
      data: [{
        type: 'collection',
        id: '2'
      }]
    })
    .reply(200, {
      type: 'collection',
      id: '2'
    });

    return store.Products.AddRelationship('1', {
      type: 'collection',
      id: '2'
    }).then((product) => {
      assert.propertyVal(product, 'id', '2');
    });
  });

  it('should delete an existing product-collection relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/products/${products[0].id}/relationships/collections`)
    .reply(200, collections[1]);

    return store.Products.DeleteRelationship(products[0].id, collections[1]).then((collection) => {
      assert.propertyVal(collection, 'id', 'collection-2');
    });
  });
});
