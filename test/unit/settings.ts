import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin settings', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('should return store settings', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/settings')
      .reply(200, {
        data: {
          type: 'settings',
          page_length: 70,
          list_child_products: false,
          additional_languages: ['es', 'fr', 'de'],
          calculation_method: 'simple'
        }
      })

    return Moltin.Settings.All().then(response => {
      assert.deepEqual(response, {
        data: {
          type: 'settings',
          page_length: 70,
          list_child_products: false,
          additional_languages: ['es', 'fr', 'de'],
          calculation_method: 'simple'
        }
      })
    })
  })

  it('should update store settings', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/settings', {
        data: {
          type: 'settings',
          page_length: 50
        }
      })
      .reply(200, {
        data: {
          type: 'settings',
          page_length: 50,
          list_child_products: false,
          additional_languages: ['es', 'fr', 'de'],
          calculation_method: 'simple'
        }
      })

    return Moltin.Settings.Update({ page_length: 50 }).then(response => {
      assert.deepEqual(response, {
        data: {
          type: 'settings',
          page_length: 50,
          list_child_products: false,
          additional_languages: ['es', 'fr', 'de'],
          calculation_method: 'simple'
        }
      })
    })
  })
})
