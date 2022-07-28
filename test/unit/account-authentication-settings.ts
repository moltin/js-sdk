import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin Account Authentication Settings', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
    gatewayId: 'mock'
  })

  it('Get all Account Settings', () => {
    nock(apiUrl, {})
      .get('/settings/account-authentication')
      .reply(200, {})

    return Moltin.AccountAuthenticationSettings.Get().then(res => {
      assert.isObject(res)
    })
  })
})
