import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import { filesArray as files, productsArray as products } from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin files', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('should create a new product-file relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/products/product-1/relationships/files', {
        data: [
          {
            type: 'file',
            id: 'file-1'
          }
        ]
      })
      .reply(200, files[0])

    return Moltin.Products.CreateRelationships(
      products[0].id,
      'file',
      files[0].id
    ).then(response => {
      assert.propertyVal(response, 'id', 'file-1')
    })
  })

  it('should create multiple new product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/products/product-1/relationships/files', {
        data: [
          {
            type: 'file',
            id: 'file-1'
          },
          {
            type: 'file',
            id: 'file-2'
          }
        ]
      })
      .reply(200, files[0])

    return Moltin.Products.CreateRelationships(products[0].id, 'file', [
      files[0].id,
      files[1].id
    ]).then(response => {
      assert.propertyVal(response, 'id', 'file-1')
    })
  })

  it('should delete an existing product-file relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/products/product-1/relationships/files', {
        data: [
          {
            type: 'file',
            id: 'file-1'
          }
        ]
      })
      .reply(204)

    return Moltin.Products.DeleteRelationships(
      products[0].id,
      'file',
      files[0].id
    ).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should delete multiple existing product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/products/product-1/relationships/files', {
        data: [
          {
            type: 'file',
            id: 'file-1'
          },
          {
            type: 'file',
            id: 'file-2'
          }
        ]
      })
      .reply(204)

    return Moltin.Products.DeleteRelationships(products[0].id, 'file', [
      files[0].id,
      files[1].id
    ]).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should update existing product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/products/product-1/relationships/files', {
        data: [
          {
            type: 'file',
            id: 'file-1'
          }
        ]
      })
      .reply(204)

    return Moltin.Products.UpdateRelationships(
      products[0].id,
      'file',
      files[0].id
    ).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should remove all existing product-file relationships', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/products/product-1/relationships/files', {
        data: []
      })
      .reply(200, {
        data: []
      })

    return Moltin.Products.UpdateRelationships(products[0].id, 'file').then(
      response => {
        assert.deepEqual(response, { data: [] })
      }
    )
  })

  it('should create a product-main_image relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/products/product-1/relationships/main-image', {
        data: {
          type: 'main_image',
          id: 'file-1'
        }
      })
      .reply(200, files[0])

    return Moltin.Products.CreateRelationships(
      products[0].id,
      'main-image',
      files[0].id
    ).then(response => {
      assert.propertyVal(response, 'id', 'file-1')
    })
  })

  it('should delete a product-main_image relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/products/product-1/relationships/main-image', {
        data: {
          type: 'main_image',
          id: 'file-1'
        }
      })
      .reply(204)

    return Moltin.Products.DeleteRelationships(
      products[0].id,
      'main-image',
      files[0].id
    ).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should update the product-main_image relationship', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/products/product-1/relationships/main-image', {
        data: {
          type: 'main_image',
          id: 'file-1'
        }
      })
      .reply(204)

    return Moltin.Products.UpdateRelationships(
      products[0].id,
      'main-image',
      files[0].id
    ).then(response => {
      assert.equal(response, '{}')
    })
  })
})
