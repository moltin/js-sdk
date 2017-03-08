/* jshint node: true */

const assert = require('chai').assert;
const nock = require('nock');
const moltin = require('../../dist/moltin.cjs.js');
const files = require('../factories').filesArray;
const products = require('../factories').productsArray;
const store = moltin.gateway({
  client_id: 'XXX'
});

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin files', () => {
  it('should return an array of files', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get('/files')
    .reply(200, files);

    return store.Files.List().then((files) => {
      assert.lengthOf(files, 4);
      assert.propertyVal(files[0], 'file_name', 'File 1');
    });
  });

  it('should return a single file', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .get(`/files/${files[0].id}`)
    .reply(200, files[0]);

    return store.Files.Get(files[0].id).then((file) => {
      assert.propertyVal(file, 'id', 'file-1');
      assert.propertyVal(file, 'file_name', 'File 1');
    });
  });

  it('should create a new file', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .post('/files', {
      data: {
        public: false,
        file: 'New file'
      }
    })
    .reply(200, {
      public: false,
      file_name: 'New file'
    });

    return store.Files.Create({
      public: false,
      file: 'New file'
    }).then((file) => {
      assert.propertyVal(file, 'file_name', 'New file');
      assert.propertyVal(file, 'public', false);
    });
  });

  it('should delete a file', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/files/${files[0].id}`)
    .reply(200, files[0]);

    return store.Files.Delete(files[0].id).then((file) => {
      assert.propertyVal(file, 'id', 'file-1');
    });
  });

  it('should create a new product-file relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .post(`/products/${products[0].id}/relationships/files`, {
      data: [
        files[1]
      ]
    })
    .reply(200, files[1]);

    return store.Products.AddRelationship(products[0].id, files[1]).then((product) => {
      assert.propertyVal(product, 'id', 'file-2');
    });
  });

  it('should delete an existing product-file relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqHeaders: {
        'Content-Type': 'application/json'
      }
    })
    .delete(`/products/${products[0].id}/relationships/files`)
    .reply(200, files[1]);

    return store.Products.DeleteRelationship(products[0].id, files[1]).then((product) => {
      assert.propertyVal(product, 'id', 'file-2');
    });
  });
});
