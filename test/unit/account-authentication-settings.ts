import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin Account Authentication Settings', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('Get all Account Settings', () => {
    nock(apiUrl, {})
      .get('/settings/account-authentication')
      .reply(200, {})

    return Moltin.AccountAuthenticationSettings.Get().then(res => {
      assert.isObject(res)
    })
  })

  it('should update account authentication settings', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
        .put('/settings/account-authentication', {
          data: {
            type: 'account_authentication_settings',
            enable_self_signup: true,
            auto_create_account_for_account_members: true,
            account_member_self_management: 'update_only'
          }
        })
        .reply(200, {
          data: {
            type: 'account_authentication_settings',
            enable_self_signup: true,
            auto_create_account_for_account_members: true,
            account_member_self_management: 'update_only'
          }
        })
    const body = {
      type: 'account_authentication_settings',
      enable_self_signup: true,
      auto_create_account_for_account_members: true,
      account_member_self_management: 'update_only'
    }

    return Moltin.AccountAuthenticationSettings.Update(body).then(response => {
      assert.deepEqual(response, {
        data: {
          type: 'account_authentication_settings',
          enable_self_signup: true,
          auto_create_account_for_account_members: true,
          account_member_self_management: 'update_only'
        }
      })
    })
  })
})
