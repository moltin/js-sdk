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

    return Moltin.AuthenticationRealms.All().then(res => {
      console.log('responding here')
      assert.isObject(res)
    })
  })

  it('Get a single Realm', () => {
    nock(apiUrl, {})
      .get(/authentication-realms\/*/)
      .reply(200, {})
    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'
    Moltin.AuthenticationRealms.Get({ realmId }).then(res => {
      assert.isObject(res)
    })
  })

  it('Create a single Realm', () => {
    nock(apiUrl, {})
      .post(/authentication-realms\/*/)
      .reply(201, {})

    const body = {
      data: {
        type: 'authentication-realm',
        name: 'Boo Authentication Realm'
      }
    }

    Moltin.AuthenticationRealms.Create(body).then(res => {
      assert.isObject(res)
    })
  })

  it('Update a single Realm', () => {
    nock(apiUrl, {})
      .put(/authentication-realms\/*/)
      .reply(201, {})

    const body = {
      data: {
        type: 'authentication-realm',
        name: 'Boo Authentication Realm'
      }
    }

    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    Moltin.AuthenticationRealms.Update(realmId, body).then(res => {
      assert.isObject(res)
    })
  })

  it('Delete a single Realm', () => {
    nock(apiUrl, {})
      .delete(/authentication-realms\/*/)
      .reply(201, {})

    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    Moltin.AuthenticationRealms.Delete(realmId).then(res => {
      assert.isObject(res)
    })
  })
})
