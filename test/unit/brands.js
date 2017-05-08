/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const brands = require('../factories').brandsArray;
const products = require('../factories').productsArray;

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin brands', () => {
  // Instantiate a Moltin client before each test
  beforeEach(() => {
    Moltin = moltin.gateway({
      client_id: 'XXX',
    });
  });

  it('should return an array of brands', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/brands')
    .reply(200, brands);

    return Moltin.Brands.All()
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a single brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/brands/brand-1')
    .reply(200, brands[0]);

    return Moltin.Brands.Get(brands[0].id)
    .then((response) => {
      assert.propertyVal(response, 'name', 'Brand 1');
    });
  });

  it('should create a new brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/brands', {
      data: {
        name: 'A new brand',
      },
    })
    .reply(201, {
      name: 'A new brand',
    });

    return Moltin.Brands.Create({
      name: 'A new brand',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'A new brand');
    });
  });

  it('should update a brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/brands/brand-1', {
      data: {
        name: 'Updated brand name',
      },
    })
    .reply(200, {
      name: 'Updated brand name',
    });

    return Moltin.Brands.Update(brands[0].id, {
      name: 'Updated brand name',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'Updated brand name');
    });
  });

  it('should delete a brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/brands/brand-1')
    .reply(200, brands[0]);

    return Moltin.Brands.Delete(brands[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'brand-1');
    });
  });

  it('should create a new product-brand relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/products/product-1/relationships/brands', {
      data: [{
        type: 'brand',
        id: 'brand-1',
      }],
    })
    .reply(200, brands[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'brand', brands[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'brand-1');
    });
  });

  it('should create multiple new product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/products/product-1/relationships/brands', {
      data: [{
        type: 'brand',
        id: 'brand-1',
      }, {
        type: 'brand',
        id: 'brand-2',
      }],
    })
    .reply(200, brands[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'brand', [brands[0].id, brands[1].id])
    .then((response) => {
      assert.propertyVal(response, 'id', 'brand-1');
    });
  });

  it('should delete an existing product-brand relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/products/product-1/relationships/brands', {
      data: [{
        type: 'brand',
        id: 'brand-1',
      }],
    })
    .reply(200, brands[0]);

    return Moltin.Products.DeleteRelationships(products[0].id, 'brand', brands[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'brand-1');
    });
  });

  it('should delete multiple existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/products/product-1/relationships/brands', {
      data: [{
        type: 'brand',
        id: 'brand-1',
      }, {
        type: 'brand',
        id: 'brand-2',
      }],
    })
    .reply(200, brands[0]);

    return Moltin.Products.DeleteRelationships(products[0].id, 'brand', [brands[0].id, brands[1].id])
    .then((response) => {
      assert.propertyVal(response, 'id', 'brand-1');
    });
  });

  it('should update existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/products/product-1/relationships/brands', {
      data: [{
        type: 'brand',
        id: 'brand-1',
      }],
    })
    .reply(200, brands[0]);

    return Moltin.Products.UpdateRelationships(products[0].id, 'brand', brands[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'brand-1');
    });
  });

  it('should remove all existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/products/product-1/relationships/brands', {
      data: null,
    })
    .reply(200, {
      data: [],
    });

    return Moltin.Products.UpdateRelationships(products[0].id, 'brand')
    .then((response) => {
      assert.deepEqual(response, { data: [] });
    });
  });
});
