import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com'

describe('Moltin Accounts', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('Get a single account', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .get(/accounts\/*/)
      .reply(200, {})
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.Accounts.Get(accountId).then(res => {
      assert.isObject(res)
    })
  })

  it('Create a single account', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .post(/accounts\/*/)
      .reply(201, {})

    const body = {
      type: 'account',
      name: 'sub-acc-test-create-name-1',
      legal_name: 'sub-acc-test-create-legal-name-1',
      registration_id: '00000000-0000-1000-8000-000000000000'
    }

    return Moltin.Accounts.Create(body).then(res => {
      assert.isObject(res)
    })
  })

  it('Get all Accounts', () => {
    nock(apiUrl, {})
      .get(/accounts\/*/)
      .reply(200, {})

    return Moltin.Accounts.All().then(res => {
      assert.isObject(res)
    })
  })

  it('Update a single account', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .put(/accounts\/*/)
      .reply(201, {})

    const body = {
      type: 'account',
      name: 'sub-acc-test-create-name-1',
      legal_name: 'sub-acc-test-create-legal-name-1',
    }

    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.Accounts.Update(accountId, body).then(res => {
      assert.isObject(res)
    })
  })

  it('Delete a single account', () => {
    const accountId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    // Intercept the API request
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .delete(/accounts\/*/)
      .reply(204, {})

    return Moltin.Accounts.Delete(accountId).then(res => {
      assert.isObject(res)
    })
  })

  it('should filter accounts', () => {
    nock(apiUrl, {})
      .post('/oauth/access_token')
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a'
      })
      .get(/accounts/)
      .reply(200, {})

    return Moltin.Accounts.Filter({
      eq: {
        name: 'bluefuse'
      }
    })
      .All()
      .then(res => {
        assert.isObject(res)
      })
  })
})
