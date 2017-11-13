import { assert } from 'chai';
import nock from 'nock';
import { gateway as MoltinGateway } from '../../src/moltin';
import { categoriesArray as categories, productsArray as products } from '../factories';

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin categories', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
  });

  it('should return an array of categories', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/categories')
    .reply(200, categories);

    return Moltin.Categories.All()
    .then((response) => {
      assert.lengthOf(response, 4);
    });
  });

  it('should return a single category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/categories/1')
    .reply(200, categories[0]);

    return Moltin.Categories.Get(1)
    .then((response) => {
      assert.propertyVal(response, 'name', 'Category 1');
    });
  });

  it('should create a new category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/categories', {
      data: {
        name: 'A new category',
      },
    })
    .reply(201, {
      name: 'A new category',
    });

    return Moltin.Categories.Create({
      name: 'A new category',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'A new category');
    });
  });

  it('should update a category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .put('/categories/1', {
      data: {
        name: 'Updated category name',
      },
    })
    .reply(200, {
      name: 'Updated category name',
    });

    return Moltin.Categories.Update('1', {
      name: 'Updated category name',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'Updated category name');
    });
  });

  it('should delete a category', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/categories/1')
    .reply(204);

    return Moltin.Categories.Delete('1')
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should create a new product-category relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/products/product-1/relationships/categories', {
      data: [{
        type: 'category',
        id: 'category-1',
      }],
    })
    .reply(200, categories[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'category', categories[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'category-1');
    });
  });

  it('should create multiple new product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/products/product-1/relationships/categories', {
      data: [{
        type: 'category',
        id: 'category-1',
      }, {
        type: 'category',
        id: 'category-2',
      }],
    })
    .reply(200, categories[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'category', [categories[0].id, categories[1].id])
    .then((response) => {
      assert.propertyVal(response, 'id', 'category-1');
    });
  });

  it('should delete an existing product-category relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/products/product-1/relationships/categories', {
      data: [{
        type: 'category',
        id: 'category-1',
      }],
    })
    .reply(204);

    return Moltin.Products.DeleteRelationships(products[0].id, 'category', categories[0].id)
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should delete multiple existing product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/products/product-1/relationships/categories', {
      data: [{
        type: 'category',
        id: 'category-1',
      }, {
        type: 'category',
        id: 'category-2',
      }],
    })
    .reply(204);

    return Moltin.Products.DeleteRelationships(products[0].id, 'category', [categories[0].id, categories[1].id])
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should update existing product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .put('/products/product-1/relationships/categories', {
      data: [{
        type: 'category',
        id: 'category-1',
      }],
    })
    .reply(204);

    return Moltin.Products.UpdateRelationships(products[0].id, 'category', categories[0].id)
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should remove all existing product-category relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .put('/products/product-1/relationships/categories', {
      data: [],
    })
    .reply(200, {
      data: [],
    });

    return Moltin.Products.UpdateRelationships(products[0].id, 'category')
    .then((response) => {
      assert.deepEqual(response, { data: [] });
    });
  });
});
