import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  brandsArray as brands,
  productsArray as products,
  brandUpdate,
  attributeResponse
} from '../factories'

const apiUrl = 'https://api.moltin.com/v2'
const authHeaders = {
  reqheaders: {
    Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
  }
}

describe('Moltin brands', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('should return an array of brands', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .get('/brands')
      .reply(200, { data: brands })

    return Moltin.Brands.All().then(response => {
      assert.lengthOf(response.data, 4)
    })
  })

  it('should return a single brand', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .get('/brands/brand-1')
      .reply(200, { data: brands[0] })

    return Moltin.Brands.Get(brands[0].id).then(response => {
      assert.equal(response.data.id, brands[0].id)
      assert.equal(response.data.name, brands[0].name)
      assert.equal(response.data.slug, brands[0].slug)
      assert.equal(response.data.description, brands[0].description)
      assert.equal(response.data.status, brands[0].status)
    })
  })

  it('should create a new brand', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .post('/brands')
      .reply(201, { data: { ...brands[0], id: undefined } })

    return Moltin.Brands.Create({ ...brands[0] }).then(response => {
      assert.equal(response.data.name, brands[0].name)
      assert.equal(response.data.slug, brands[0].slug)
      assert.equal(response.data.description, brands[0].description)
      assert.equal(response.data.status, brands[0].status)
    })
  })

  it('should update a brand', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .put('/brands/brand-1')
      .reply(200, { data: { ...brands[0], ...brandUpdate } })

    return Moltin.Brands.Update(brands[0].id, {
      ...brands[0],
      ...brandUpdate
    }).then(response => {
      assert.equal(response.data.id, brands[0].id)
      assert.equal(response.data.description, brands[0].description)
      assert.equal(response.data.status, brands[0].status)

      assert.equal(response.data.name, brandUpdate.name)
      assert.equal(response.data.slug, brandUpdate.slug)
    })
  })

  it('should delete a brand', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .delete('/brands/brand-1')
      .reply(204)

    return Moltin.Brands.Delete(brands[0].id).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should create a new product-brand relationship', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .post('/products/product-1/relationships/brands', {
        data: [
          {
            type: 'brand',
            id: 'brand-1'
          }
        ]
      })
      .reply(200, brands[0])

    return Moltin.Products.CreateRelationships(
      products[0].id,
      'brand',
      brands[0].id
    ).then(response => {
      assert.propertyVal(response, 'id', 'brand-1')
    })
  })

  it('should create multiple new product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .post('/products/product-1/relationships/brands', {
        data: [
          {
            type: 'brand',
            id: 'brand-1'
          },
          {
            type: 'brand',
            id: 'brand-2'
          }
        ]
      })
      .reply(200, brands[0])

    return Moltin.Products.CreateRelationships(products[0].id, 'brand', [
      brands[0].id,
      brands[1].id
    ]).then(response => {
      assert.propertyVal(response, 'id', 'brand-1')
    })
  })

  it('should delete an existing product-brand relationship', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .delete('/products/product-1/relationships/brands', {
        data: [
          {
            type: 'brand',
            id: 'brand-1'
          }
        ]
      })
      .reply(204)

    return Moltin.Products.DeleteRelationships(
      products[0].id,
      'brand',
      brands[0].id
    ).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should delete multiple existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .delete('/products/product-1/relationships/brands', {
        data: [
          {
            type: 'brand',
            id: 'brand-1'
          },
          {
            type: 'brand',
            id: 'brand-2'
          }
        ]
      })
      .reply(204)

    return Moltin.Products.DeleteRelationships(products[0].id, 'brand', [
      brands[0].id,
      brands[1].id
    ]).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should update existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .put('/products/product-1/relationships/brands', {
        data: [
          {
            type: 'brand',
            id: 'brand-1'
          }
        ]
      })
      .reply(200, brands[0])

    return Moltin.Products.UpdateRelationships(
      products[0].id,
      'brand',
      brands[0].id
    ).then(response => {
      assert.propertyVal(response, 'id', 'brand-1')
    })
  })

  it('should remove all existing product-brand relationships', () => {
    // Intercept the API request
    nock(apiUrl, authHeaders)
      .put('/products/product-1/relationships/brands', {
        data: []
      })
      .reply(200, {
        data: []
      })

    return Moltin.Products.UpdateRelationships(products[0].id, 'brand').then(
      response => {
        assert.deepEqual(response, { data: [] })
      }
    )
  })

  it('should return an array of attributes', () => {
    nock(apiUrl, authHeaders)
      .get('/brands/attributes')
      .reply(200, attributeResponse)

    return Moltin.Brands.Attributes('testtoken').then(response => {
      assert.lengthOf(response.data, 3)
    })
  })
})
