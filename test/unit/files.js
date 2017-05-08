/* eslint no-undef: "off",
          import/no-extraneous-dependencies: "off"
*/

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const files = require('../factories').filesArray;
const products = require('../factories').productsArray;

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin files', () => {
  // Instantiate a Moltin client before each test
  beforeEach(() => {
    Moltin = moltin.gateway({
      client_id: 'XXX',
    });
  });

  it('should return an array of files', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/files')
    .reply(200, files);

    return Moltin.Files.All()
    .then((response) => {
      assert.lengthOf(response, 4);
      assert.propertyVal(response[0], 'file_name', 'File 1');
    });
  });

  it('should return a single file', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .get('/files/file-1')
    .reply(200, files[0]);

    return Moltin.Files.Get(files[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'file-1');
      assert.propertyVal(response, 'file_name', 'File 1');
    });
  });

  it('should create a new file', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/files', {
      data: {
        public: false,
        file: 'New file',
      },
    })
    .reply(200, {
      public: false,
      file_name: 'New file',
    });

    return Moltin.Files.Create({
      public: false,
      file: 'New file',
    })
    .then((response) => {
      assert.propertyVal(response, 'file_name', 'New file');
      assert.propertyVal(response, 'public', false);
    });
  });

  it('should delete a file', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/files/file-1')
    .reply(200, files[0]);

    return Moltin.Files.Delete(files[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'file-1');
    });
  });

  it('should create a new product-file relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/products/product-1/relationships/files', {
      data: [{
        type: 'file',
        id: 'file-1',
      }],
    })
    .reply(200, files[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'file', files[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'file-1');
    });
  });

  it('should create multiple new product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .post('/products/product-1/relationships/files', {
      data: [{
        type: 'file',
        id: 'file-1',
      }, {
        type: 'file',
        id: 'file-2',
      }],
    })
    .reply(200, files[0]);

    return Moltin.Products.CreateRelationships(products[0].id, 'file', [files[0].id, files[1].id])
    .then((response) => {
      assert.propertyVal(response, 'id', 'file-1');
    });
  });

  it('should delete an existing product-file relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/products/product-1/relationships/files', {
      data: [{
        type: 'file',
        id: 'file-1',
      }],
    })
    .reply(200, files[0]);

    return Moltin.Products.DeleteRelationships(products[0].id, 'file', files[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'file-1');
    });
  });

  it('should delete multiple existing product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .delete('/products/product-1/relationships/files', {
      data: [{
        type: 'file',
        id: 'file-1',
      }, {
        type: 'file',
        id: 'file-2',
      }],
    })
    .reply(200, files[0]);

    return Moltin.Products.DeleteRelationships(products[0].id, 'file', [files[0].id, files[1].id])
    .then((response) => {
      assert.propertyVal(response, 'id', 'file-1');
    });
  });

  it('should remove all existing product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/products/product-1/relationships/files', {
      data: [{
        type: 'file',
        id: 'file-1',
      }],
    })
    .reply(200, files[0]);

    return Moltin.Products.UpdateRelationships(products[0].id, 'file', files[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'file-1');
    });
  });

  it('should remove all existing product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        Authorization: 'a550d8cbd4a4627013452359ab69694cd446615a',
        'Content-Type': 'application/json',
      },
    })
    .put('/products/product-1/relationships/files', {
      data: null,
    })
    .reply(200, {
      data: [],
    });

    return Moltin.Products.UpdateRelationships(products[0].id, 'file')
    .then((response) => {
      assert.deepEqual(response, { data: [] });
    });
  });
});
