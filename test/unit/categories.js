/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const categories = require('../factories').categoriesArray;
const products = require('../factories').productsArray;
const store = moltin.gateway({
  publicId: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin categories', () => {
  it('should return an array of categories', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/categories')
    .reply(200, categories);

    return store.Categories.List().then((categories) => {
      assert.lengthOf(categories, 4);
    });
  });

  it('should return a single category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/categories/1')
    .reply(200, categories[0]);

    return store.Categories.Get(1).then((category) => {
      assert.propertyVal(category, 'name', 'Category 1');
    });
  });

  it('should create a new category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post('/categories')
    .reply(201, {
      name: 'A new category'
    });

    return store.Categories.Create({
      name: 'A new category'
    }).then((category) => {
      assert.propertyVal(category, 'name', 'A new category');
    });
  });

  it('should update a category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .put('/categories/1')
    .reply(200, {
      name: 'Updated category name'
    });

    return store.Categories.Update('1', {
      name: 'Updated category name'
    }).then((category) => {
      assert.propertyVal(category, 'name', 'Updated category name');
    });
  });

  it('should delete a category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete('/categories/1')
    .reply(200, {
      type: 'category',
      id: '1'
    });

    return store.Categories.Delete('1').then((category) => {
      assert.propertyVal(category, 'id', '1');
    });
  });

  it('should create a new product-category relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/products/${products[0].id}/relationships/categories`, {
      data: [
        categories[1]
      ]
    })
    .reply(200, categories[1]);

    return store.Products.AddRelationship(products[0].id, categories[1]).then((product) => {
      assert.propertyVal(product, 'id', 'category-2');
    });
  });

  it('should delete an existing product-category relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/products/${products[0].id}/relationships/categories`)
    .reply(200, categories[1]);

    return store.Products.DeleteRelationship(products[0].id, categories[1]).then((product) => {
      assert.propertyVal(product, 'id', 'category-2');
    });
  });
});
