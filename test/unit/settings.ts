import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://euwest.api.elasticpath.com/v2'

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
          calculation_method: 'simple',
          address_mandatory_fields: [
            'first_name',
            'last_name',
            'line_1',
            'city',
            'region',
            'postcode',
            'country',
            'instructions'
          ],
          include_organization_resources: false
        }
      })

    return Moltin.Settings.All().then(response => {
      assert.deepEqual(response, {
        data: {
          type: 'settings',
          page_length: 70,
          list_child_products: false,
          additional_languages: ['es', 'fr', 'de'],
          calculation_method: 'simple',
          address_mandatory_fields: [
            'first_name',
            'last_name',
            'line_1',
            'city',
            'region',
            'postcode',
            'country',
            'instructions'
          ],
          include_organization_resources: false
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
          calculation_method: 'simple',
          address_mandatory_fields: [
            'first_name',
            'last_name',
            'line_1',
            'city',
            'region',
            'postcode',
            'country',
            'instructions'
          ],
          include_organization_resources: false
        }
      })

    return Moltin.Settings.Update({ page_length: 50 }).then(response => {
      assert.deepEqual(response, {
        data: {
          type: 'settings',
          page_length: 50,
          list_child_products: false,
          additional_languages: ['es', 'fr', 'de'],
          calculation_method: 'simple',
          address_mandatory_fields: [
            'first_name',
            'last_name',
            'line_1',
            'city',
            'region',
            'postcode',
            'country',
            'instructions'
          ],
          include_organization_resources: false
        }
      })
    })
  })

  it('should delete store settings', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
        .delete('/settings')
        .reply(204, {})

    return Moltin.Settings.Delete().then(response => {
      assert.deepEqual(response, {})
    })
  })
})
