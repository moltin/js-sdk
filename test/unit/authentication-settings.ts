import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin Authentication Settings', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
  })

  it('Get all Settings', () => {
    nock(apiUrl, {})
      .get('/customer-authentication-settings')
      .reply(200, {})

    Moltin.AuthenticationSettings.Get().then(res => {
      assert.isObject(res)
    }).catch(err=>console.error(err))
  })
})
