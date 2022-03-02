import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com'

describe('Moltin Personal Data', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('Get all Related Data Entries', () => {
    nock(apiUrl, {})
      .get(
        '/personal-data/related-data-entries?filter=eq(resource_id,64f35045-2a76-4bcf-b6ba-02bb12090d38):eq(resource_type,account)'
      )
      .reply(200, {})

    return Moltin.DataEntries.Filter({
      eq: {
        resource_id: '64f35045-2a76-4bcf-b6ba-02bb12090d38',
        resource_type: 'account'
      }
    })
      .RelatedDataEntries()
      .then(res => {
        assert.isObject(res)
      })
  })
})
