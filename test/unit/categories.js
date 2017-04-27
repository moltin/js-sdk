/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const categories = require('../factories').categoriesArray;
const products = require('../factories').productsArray;

const store = moltin.gateway({
  client_id: 'XXX',
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin categories', () => {
  it('should return an array of categories', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/categories')
    .reply(200, categories);

    return store.Categories.All().then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a single category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/categories/1')
    .reply(200, categories[0]);

    return store.Categories.Get(1).then((response) => {
      assert.propertyVal(response, 'name', 'Category 1');
    });
  });

  it('should create a new category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/categories')
    .reply(201, {
      name: 'A new category',
    });

    return store.Categories.Create({
      name: 'A new category',
    }).then((response) => {
      assert.propertyVal(response, 'name', 'A new category');
    });
  });

  it('should update a category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/categories/1')
    .reply(200, {
      name: 'Updated category name',
    });

    return store.Categories.Update('1', {
      name: 'Updated category name',
    }).then((response) => {
      assert.propertyVal(response, 'name', 'Updated category name');
    });
  });

  it('should delete a category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/categories/1')
    .reply(200, {
      type: 'category',
      id: '1',
    });

    return store.Categories.Delete('1').then((response) => {
      assert.propertyVal(response, 'id', '1');
    });
  });

  it('should create a new product-category relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post(`/products/${products[0].id}/relationships/categories`, {
      data: [{
        type: 'category',
        id: 'category-1',
      }],
    })
    .reply(200, categories[0]);

    return store.Products.CreateRelationships(products[0].id, 'category', categories[0].id).then((response) => {
      assert.propertyVal(response, 'id', 'category-1');
    });
  });

  it('should create multiple new product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post(`/products/${products[0].id}/relationships/categories`, {
      data: [{
        type: 'category',
        id: 'category-1',
      }, {
        type: 'category',
        id: 'category-2',
      }],
    })
    .reply(200, categories[0]);

    return store.Products.CreateRelationships(products[0].id, 'category', [categories[0].id, categories[1].id]).then((response) => {
      assert.propertyVal(response, 'id', 'category-1');
    });
  });

  it('should delete an existing product-category relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete(`/products/${products[0].id}/relationships/categories`, {
      data: [{
        type: 'category',
        id: 'category-1',
      }],
    })
    .reply(200, categories[0]);

    return store.Products.DeleteRelationships(products[0].id, 'category', categories[0].id).then((response) => {
      assert.propertyVal(response, 'id', 'category-1');
    });
  });

  it('should delete multiple existing product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete(`/products/${products[0].id}/relationships/categories`, {
      data: [{
        type: 'category',
        id: 'category-1',
      }, {
        type: 'category',
        id: 'category-2',
      }],
    })
    .reply(200, categories[0]);

    return store.Products.DeleteRelationships(products[0].id, 'category', [categories[0].id, categories[1].id]).then((response) => {
      assert.propertyVal(response, 'id', 'category-1');
    });
  });

  it('should update existing product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put(`/products/${products[0].id}/relationships/categories`, {
      data: [{
        type: 'category',
        id: 'category-1',
      }],
    })
    .reply(200, categories[0]);

    return store.Products.UpdateRelationships(products[0].id, 'category', categories[0].id).then((response) => {
      assert.propertyVal(response, 'id', 'category-1');
    });
  });

  it('should remove all existing product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put(`/products/${products[0].id}/relationships/categories`, {
      data: null,
    })
    .reply(200, {
      data: [],
    });

    return store.Products.UpdateRelationships(products[0].id, 'category').then((response) => {
      assert.deepEqual(response, { data: [] });
    });
  });
});
