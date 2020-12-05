import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin Authentication Realms', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('Get all Realms', () => {
    nock(apiUrl, {})
      .get('/authentication-realms')
      .reply(200, {})

    return Moltin.AuthenticationRealm.All().then(res => {
      assert.isObject(res)
    })
  })

  it('Get a single Realm', () => {
    nock(apiUrl, {})
      .get(/authentication-realms\/*/)
      .reply(200, {})
    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AuthenticationRealm.Get(realmId).then(res => {
      assert.isObject(res)
    })
  })

  it('Create a single Realm', () => {
    nock(apiUrl, {})
      .post(/authentication-realms\/*/)
      .reply(201, {})

    const body = {
      type: 'authentication-realm',
      name: 'Boo Authentication Realm'
    }

    return Moltin.AuthenticationRealm.Create(body).then(res => {
      assert.isObject(res)
    })
  })

  it('Update a single Realm', () => {
    nock(apiUrl, {})
      .put(/authentication-realms\/*/)
      .reply(201, {})

    const body = {
      type: 'authentication-realm',
      name: 'Boo Authentication Realm'
    }

    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AuthenticationRealm.Update(realmId, body).then(res => {
      assert.isObject(res)
    })
  })

  it('Delete a single Realm', () => {
    nock(apiUrl, {})
      .delete(/authentication-realms\/*/)
      .reply(204, {})

    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    return Moltin.AuthenticationRealm.Delete(realmId).then(res => {
      assert.isObject(res)
    })
  })
})
