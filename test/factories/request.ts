import { assert } from 'chai'
import nock from 'nock'
import fakeTimers from '@sinonjs/fake-timers'
import { gateway as MoltinGateway } from '../../src/moltin'
import { shopperCatalogProductResponse } from '../factories'

const apiUrl = 'https://euwest.api.elasticpath.com'

describe('Moltin request', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  let clock: fakeTimers.InstalledClock | undefined

  beforeEach(() => {
    clock = fakeTimers.install({
      shouldAdvanceTime: true,
      advanceTimeDelta: 1
    })
  })

  afterEach(() => {
    clock?.uninstall()
  })

  it('Moltin request when 401 response should attempt to re-authenticate', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/oauth/access_token')
      .reply(200, {
        token_type: 'Bearer',
        expires_in: 9999999999,
        expires: 9999999999,
        identifier: 'implicit',
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })

    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/catalog/products/1')
      .reply(401, {
        errors: {
          title: 'Unauthorized',
          status: 401
        }
      })
      .get('/catalog/products/1')
      .reply(200, shopperCatalogProductResponse)

    return Moltin.ShopperCatalog.Products.Get({ productId: '1' }).then(
      response => {
        assert.equal(response.data.attributes.name, 'Playstation 5 Controller')
      }
    )
  })
})
