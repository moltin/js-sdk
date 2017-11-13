import { assert } from 'chai';
import nock from 'nock';
import { gateway as MoltinGateway } from '../../src/moltin';
import { brandsArray as brands, productsArray as products } from '../factories';

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin brands', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
  });

  it('should return an array of brands', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/brands/brand-1')
    .reply(204);

    return Moltin.Brands.Delete(brands[0].id)
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should create a new product-brand relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/products/product-1/relationships/brands', {
      data: [{
        type: 'brand',
        id: 'brand-1',
      }],
    })
    .reply(204);

    return Moltin.Products.DeleteRelationships(products[0].id, 'brand', brands[0].id)
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should delete multiple existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
    .reply(204);

    return Moltin.Products.DeleteRelationships(products[0].id, 'brand', [brands[0].id, brands[1].id])
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should update existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .put('/products/product-1/relationships/brands', {
      data: [],
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
