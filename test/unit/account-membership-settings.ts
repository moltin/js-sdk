import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin Account Membership Settings', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('Get Account Membership Settings', () => {
    nock(apiUrl, {})
      .get('/settings/account-membership')
      .reply(200, {})

    return Moltin.AccountMembershipSettings.Get().then(res => {
      assert.isObject(res)
    })
  })

  it('Update Account Membership Settings', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .put('/settings/account-membership')
      .reply(200, {})

    const body = {
      type: 'account_membership_setting',
      membership_limit: 2
    }

    return Moltin.AccountMembershipSettings.Update(body).then(res => {
      assert.isObject(res)
    })
  })
})
