import { assert } from 'chai'
import nock from 'nock'
import {
  AccountMembershipCreateBody,
  gateway as MoltinGateway
} from '../../src/moltin'
import { accountMembershipsArray } from '../factories'

const apiUrl = 'https://api.moltin.com'

describe('Moltin Account Memberships', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('Get a single account membership', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .get(/accounts\/.*\/account-memberships\/.*/)
      .reply(200, {})
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'
    const accountMembershipId = '64f35045-2a76-4bcf-b6ba-02bb12090d39'

    return Moltin.AccountMemberships.Get(accountId, accountMembershipId).then(
      res => {
        assert.isObject(res)
      }
    )
  })

  it('Get all Account Memberships for an account', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .get(/accounts\/.*\/account-memberships/)
      .reply(200, {})
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AccountMemberships.All(accountId).then(res => {
      assert.isObject(res)
    })
  })

  it('Get all Unassigned Account Members for an account', () => {
    nock(apiUrl, {})
        .post('/oauth/access_token')
        .reply(200, {
          access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
        })
        .get(/accounts\/.*\/account-memberships\/unassigned-account-members/)
        .reply(200, {})
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AccountMembers.UnassignedAccountMembers(accountId).then(res => {
      assert.isObject(res)
    })
  })

  it('Get all Unassigned Account Members for an account with filter', () => {
    nock(apiUrl, {})
        .post('/oauth/access_token')
        .reply(200, {
          access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
        })
        .get(/accounts\/.*\/account-memberships\/unassigned-account-members/)
        .reply(200, {})
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AccountMembers.Filter({ eq: { name: 'John' }}).UnassignedAccountMembers(accountId).then(res => {
      assert.isObject(res)
    })
  })

  it('Get all Account Memberships for an account using limit', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .get(/accounts\/.*\/account-memberships/)
      .query({
        page: {
          limit: 3
        }
      })
      .reply(200, { data: accountMembershipsArray })
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AccountMemberships.Limit(3)
      .All(accountId)
      .then(res => {
        assert.lengthOf(res.data, 3)
      })
  })

  it('Create a single account membership', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .post(/accounts\/.*\/account-memberships/)
      .reply(201, {})
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    const body: AccountMembershipCreateBody = {
      account_member_id: '64f35045-2a76-4bcf-b6ba-02bb12090d30',
      type: 'account_membership'
    }
    return Moltin.AccountMemberships.Create(accountId, body).then(res => {
      assert.isObject(res)
    })
  })

  it('Delete a single account', () => {
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'
    const accountMembershipId = '64f35045-2a76-4bcf-b6ba-02bb12090d39'

    // Intercept the API request
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .delete(/accounts\/.*\/account-memberships\/.*/)
      .reply(204, {})

    return Moltin.AccountMemberships.Delete(
      accountId,
      accountMembershipId
    ).then(res => {
      assert.isObject(res)
    })
  })

  it('Get all Account Memberships for an account using filter', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .get(/accounts\/.*\/account-memberships/)
      .query({
        filter: 'eq(account_member_id,00000000-0000-1000-8000-111111111111)'
      })
      .reply(200, { data: accountMembershipsArray })
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AccountMemberships.Filter({
      eq: {
        account_member_id: '00000000-0000-1000-8000-111111111111'
      }
    })
      .All(accountId)
      .then(res => {
        assert.isObject(res)
      })
  })
})
