import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import { notFoundError, rateLimitError } from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin error handling', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('should handle a 429 correctly', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/products')
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
})
