/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const brands = require('../factories').brandsArray;
const products = require('../factories').productsArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin brands', () => {
  it('should return an array of brands', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/brands')
    .reply(200, brands);

    return store.Brands.All().then((brands) => {
      assert.lengthOf(brands, 4);
    });
  });

  it('should return a single brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/brands/${brands[0].id}`)
    .reply(200, brands[0]);

    return store.Brands.Get(brands[0].id).then((brand) => {
      assert.propertyVal(brand, 'name', 'Brand 1');
    });
  });

  it('should create a new brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/brands', {
      data: {
        name: 'A new brand'
      }
    })
    .reply(201, {
      name: 'A new brand'
    });

    return store.Brands.Create({
      name: 'A new brand'
    }).then((brand) => {
      assert.propertyVal(brand, 'name', 'A new brand');
    });
  });

  it('should update a brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put(`/brands/${brands[0].id}`, {
      data: {
        name: 'Updated brand name'
      }
    })
    .reply(200, {
      name: 'Updated brand name'
    });

    return store.Brands.Update(brands[0].id, {
      name: 'Updated brand name'
    }).then((brand) => {
      assert.propertyVal(brand, 'name', 'Updated brand name');
    });
  });

  it('should delete a brand', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/brands/${brands[0].id}`)
    .reply(200, brands[0]);

    return store.Brands.Delete(brands[0].id).then((brand) => {
      assert.propertyVal(brand, 'id', 'brand-1');
    });
  });

  it('should create a new product-brand relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/products/${products[0].id}/relationships/brands`, {
      data: [
        brands[1]
      ]
    })
    .reply(200, brands[1]);

    return store.Products.AddRelationship(products[0].id, brands[1]).then((product) => {
      assert.propertyVal(product, 'id', 'brand-2');
    });
  });

  it('should delete an existing product-brand relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/products/${products[0].id}/relationships/brands`)
    .reply(200, brands[1]);

    return store.Products.DeleteRelationship(products[0].id, brands[1]).then((product) => {
      assert.propertyVal(product, 'id', 'brand-2');
    });
  });
});
