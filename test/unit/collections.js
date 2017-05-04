/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const collections = require('../factories').collectionsArray;
const products = require('../factories').productsArray;

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin collections', () => {
  // Instantiate a Moltin client before each test
  beforeEach(() => {
    Moltin = moltin.gateway({
      client_id: 'XXX',
    });
  });

  it('should return an array of collections', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/collections')
    .reply(200, collections);

    return Moltin.Collections.All()
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a single collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/collections/1')
    .reply(200, collections[0]);

    return Moltin.Collections.Get(1)
    .then((response) => {
      assert.propertyVal(response, 'name', 'Collection 1');
    });
  });

  it('should create a new collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/collections')
    .reply(201, {
      name: 'A new collection',
    });

    return Moltin.Collections.Create({
      name: 'A new collection',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'A new collection');
    });
  });

  it('should update a collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/collections/1', {
      data: {
        name: 'Updated collection name',
      },
    })
    .reply(200, {
      name: 'Updated collection name',
    });

    return Moltin.Collections.Update('1', {
      name: 'Updated collection name',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'Updated collection name');
    });
  });

  it('should delete a collection', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/collections/1')
    .reply(200, {
      type: 'collection',
      id: '1',
    });

    return Moltin.Collections.Delete('1')
    .then((response) => {
      assert.propertyVal(response, 'id', '1');
    });
  });

  it('should create a new product-collection relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/products/product-1/relationships/collections', {
      data: [{
        type: 'collection',
        id: 'collection-1',
      }],
    })
    .reply(200, collections[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'collection', collections[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'collection-1');
    });
  });

  it('should create multiple new product-collection relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/products/product-1/relationships/collections', {
      data: [{
        type: 'collection',
        id: 'collection-1',
      }, {
        type: 'collection',
        id: 'collection-2',
      }],
    })
    .reply(200, collections[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'collection', [collections[0].id, collections[1].id])
    .then((response) => {
      assert.propertyVal(response, 'id', 'collection-1');
    });
  });

  it('should delete an existing product-collection relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/products/product-1/relationships/collections', {
      data: [{
        type: 'collection',
        id: 'collection-1',
      }],
    })
    .reply(200, collections[0]);

    return Moltin.Products.DeleteRelationships(products[0].id, 'collection', collections[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'collection-1');
    });
  });

  it('should delete multiple existing product-collection relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/products/product-1/relationships/collections', {
      data: [{
        type: 'collection',
        id: 'collection-1',
      }, {
        type: 'collection',
        id: 'collection-2',
      }],
    })
    .reply(200, collections[0]);

    return Moltin.Products.DeleteRelationships(products[0].id, 'collection', [collections[0].id, collections[1].id])
    .then((response) => {
      assert.propertyVal(response, 'id', 'collection-1');
    });
  });

  it('should update existing product-collection relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/products/product-1/relationships/collections', {
      data: [{
        type: 'collection',
        id: 'collection-1',
      }],
    })
    .reply(200, collections[0]);

    return Moltin.Products.UpdateRelationships(products[0].id, 'collection', collections[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'collection-1');
    });
  });

  it('should remove all existing product-collection relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/products/product-1/relationships/collections', {
      data: null,
    })
    .reply(200, {
      data: [],
    });

    return Moltin.Products.UpdateRelationships(products[0].id, 'collection')
    .then((response) => {
      assert.deepEqual(response, { data: [] });
    });
  });
});
