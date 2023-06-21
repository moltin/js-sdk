import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  notFoundError,
  rateLimitError,
  productsArray as products
} from '../factories'

const apiUrl = 'https://euwest.api.elasticpath.com/v2'

describe('Moltin error handling', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
    retryDelay: 10, // Reduce retryDelay/retryJitter/fetchMaxAttempts for retries during testing
    retryJitter: 1,
    fetchMaxAttempts: 2 // Minimum amount of fetch attempts we need for these tests.
  })

  it('should handle a 429 correctly', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .times(2)
      .reply(429, rateLimitError)

    return Moltin.Products.All().catch(error => {
      assert.deepEqual(error, { errors: [{ status: 429 }] })
    })
  })

  it('should handle a 404 correctly', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .reply(404, notFoundError)

    return Moltin.Products.All().catch(error => {
      assert.deepEqual(error, {
        errors: [
          {
            status: 404,
            detail: 'The requested product could not be found',
            title: 'Product not found'
          }
        ]
      })
    })
  })

  it('should handle retry then success correctly', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
      .reply(429, rateLimitError)
      .get('/products')
      .reply(200, { data: products })
    return Moltin.Products.All().then(response => {
      assert.lengthOf(response.data, 4)
    })
  })
})
