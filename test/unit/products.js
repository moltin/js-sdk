/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const products = require('../factories').productsArray;

const store = moltin.gateway({
  client_id: 'XXX',
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin products', () => {
  it('should return an array of products', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/products')
    .reply(200, products);

    return store.Products.All().then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a single product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/products/1')
    .reply(200, products[0]);

    return store.Products.Get(1).then((response) => {
      assert.propertyVal(response, 'name', 'Product 1');
    });
  });

  it('should return a limited number of products', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/products?page[limit]=4')
    .reply(200, products);

    return store.Products.Limit(4).All().then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a limited number of products offset by a value', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/products?page[limit]=4&page[offset]=10')
    .reply(200, products);

    return store.Products.Limit(4).Offset(10).All().then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return all products and include associated brands, categories, collections', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/products?include=brands,categories,collections&page[limit]=4&page[offset]=10')
    .reply(200, products);

    return store.Products.With(['brands', 'categories', 'collections']).Limit(4).Offset(10).All()
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a single product and include associated brands, categories, collections', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/products/1?include=brands,categories,collections')
    .reply(200, products[0]);

    return store.Products.With(['brands', 'categories', 'collections']).Get(1).then((response) => {
      assert.propertyVal(response, 'name', 'Product 1');
    });
  });

  it('should return all products sorted by name key', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/products?include=brands&sort=(name)&page[limit]=4&page[offset]=10')
    .reply(200, products);

    return store.Products.Sort('name').With(['brands']).Limit(4).Offset(10)
    .All()
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should create a new product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/products', {
      data: {
        name: 'A new product',
      },
    })
    .reply(201, {
      name: 'A new product',
    });

    return store.Products.Create({
      name: 'A new product',
    }).then((response) => {
      assert.propertyVal(response, 'name', 'A new product');
    });
  });

  it('should update a product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/products/1', {
      data: {
        name: 'Updated product name',
      },
    })
    .reply(200, {
      name: 'Updated product name',
    });

    return store.Products.Update(1, {
      name: 'Updated product name',
    }).then((response) => {
      assert.propertyVal(response, 'name', 'Updated product name');
    });
  });

  it('should delete a product', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/products/1')
    .reply(200, {
      type: 'product',
      id: '1',
    });

    return store.Products.Delete(1).then((response) => {
      assert.propertyVal(response, 'id', '1');
    });
  });
});
