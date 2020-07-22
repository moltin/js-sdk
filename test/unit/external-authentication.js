import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://auth.us-west-perf-api.molt.in/v2'
// const apiUrl = 'localhost:8080'

describe('Moltin Authenitcation Realms', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
    host: 'auth.us-west-perf-api.molt.in'
  })

  // Moltin.config.storage.set('moltinCredentials', '{"client_id":"XXX","access_token":"1d2faf0f1a8b6117cba6841f74ec4707a4743148","expires":"999999999999999999999"}')

  it('Get all Realms', () => {
    nock(apiUrl, {})
      .get('/authentication-realms')
      .reply(200, {})

    return Moltin.AuthenticationRealms.All().then(res => {
      assert.isObject(res)
    })
  })

  it('Get a single Realm', () => {
    nock(apiUrl, {})
      .get('/authentication-realms')
      .reply(200, {})
    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'
    Moltin.AuthenticationRealms.Get({ realmId }).then(res => {
      assert.isObject(res)
    })
  })

  it('Create a single Realm', () => {
    nock(apiUrl, {})
      .post('/authentication-realms')
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
      .put('/authentication-realms')
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
    // TODO:  Creates a single Realm...
    nock(apiUrl, {})
      .delete('/authentication-realms')
      .reply(201, {})

    const realmId = '64f35045-2a76-4bcf-b6ba-02bb12090d38'

    Moltin.AuthenticationRealms.Delete(realmId).then(res => {
      assert.isObject(res)
    })
  })
})
