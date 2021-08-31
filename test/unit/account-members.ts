import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com'

describe('Moltin Account Members', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('Get a single account member', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .get(/account-members\/*/)
      .reply(200, {})
    const accountMemberId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AccountMembers.Get(accountMemberId).then(res => {
      assert.isObject(res)
    })
  })

  it('Get all Account Members', () => {
    nock(apiUrl, {})
      .get(/account-members\/*/)
      .reply(200, {})

    return Moltin.AccountMembers.All().then(res => {
      assert.isObject(res)
    })
  })

  it('Get all Account Members with filter', () => {
    nock(apiUrl, {})
      .get(/account-members\/*/)
      .query({
        filter: 'eq(name,John)'
      })
      .reply(200, {})

    return Moltin.AccountMembers.Filter({ eq: { name: 'John' } })
      .All()
      .then(res => {
        assert.isObject(res)
      })
  })
})
