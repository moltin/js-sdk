import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway, RealmCreateBody, Resource } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin Authentication Realms', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
  })

  it('Get all Realms', () => {
    nock(apiUrl, {})
      .get('/authentication-realms')
      .reply(200, {})

    Moltin.AuthenticationRealm.All().then(res => {
      assert.isObject(res)
    }).catch((err)=>console.error(err))
  })

  it('Get a single Realm', () => {
    nock(apiUrl, {})
      .get(/authentication-realms\/*/)
      .reply(200, {})
    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'
    Moltin.AuthenticationRealm.Get(realmId).then(res => {
      assert.isObject(res)
    }).catch((err)=>console.error(err))
  })

  it('Create a single Realm', () => {
    nock(apiUrl, {})
      .post(/authentication-realms\/*/)
      .reply(201, {})

    const body:RealmCreateBody = {
        type: 'authentication-realm',
        name: 'Boo Authentication Realm'
    }
    
    Moltin.AuthenticationRealm.Create(body).then(res => {
      assert.isObject(res)
    }).catch((err)=>console.error(err))
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

    Moltin.AuthenticationRealm.Update(realmId, body).then(res => {
      assert.isObject(res)
    }).catch((err)=>console.error(err))
  })

  it('Delete a single Realm', () => {
    nock(apiUrl, {})
      .delete(/authentication-realms\/*/)
      .reply(204, {})

    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    Moltin.AuthenticationRealm.Delete(realmId).then(res => {
      assert.isObject(res)
    }).catch((err)=>console.error(err))
  })
})
