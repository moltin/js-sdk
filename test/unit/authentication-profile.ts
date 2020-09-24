import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

// TODO: Test with integration first... 
// const apiUrl = 'https://api.moltin.com/v2'
const apiUrl = 'https://epcc-integration.global.ssl.fastly.net/v2'

describe('Authentication Profiles', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  // Random ID
  const realmId = '96764ca9-af12-4355-acce-37fa2ef4728a'

  it('Get all Profiles', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/profiles\/oidc/)
      .reply(200, {})

    Moltin.AuthenticationProfile.All(
      realmId
    ).then(res => {
      assert.isObject(res)
    }).catch(err=>console.error(err))
  })

  it('Get a single Profile', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/profiles\/oidc\/(.*)/)
      .reply(200, {})

    Moltin.AuthenticationProfile.Get({
      realmId,
      profileId: '4da65e78-7f9b-4248-b498-823d43120da9'
    }).then(res => {
      assert.isObject(res)
    }).catch(err=>console.error(err))
  })

  it('Create a single authentication Profile', () => {
    nock(apiUrl, {})
      .post(/\/authentication-realms\/(.*)\/profiles\/oidc/)
      .reply(201, {})

    const body = {
      data: {
        name: 'Keycloak',
        type: 'authentication-profile-oidc',
        discovery_url: 'https://localhost:3000/discovery_url',
        client_id: 'test-client',
        client_secret: 'XXXXXX'
      }
    }

    Moltin.AuthenticationProfile.Create(realmId, body)
    .then(res => {
      assert.isObject(res)
    })
    .catch(err=>console.error(err))
  })

  it('Update a single authentication Profile', () => {
    nock(apiUrl, {})
      .put(/\/authentication-realms\/(.*)\/profiles\/oidc\/(.*)/)
      .reply(201, {})

    const body = {
      data: {
        name: 'Keycloak 2',
        type: 'authentication-profile-oidc',
        discovery_url:
          'http://localhost:24074/auth/realms/Sample/.well-known/openid-configuration',
        client_id: 'openid-client',
        client_secret: 'ba5eba11-affec7ed-c0ff1e'
      }
    }

    const profileId = 'e1b5c7fa-f2b6-48d2-b659-3d82f20968a9'

    Moltin.AuthenticationProfile.Update(realmId, profileId, body).then(res => {
      assert.isObject(res)
    }).catch(err=>console.error(err))
  })

  it('Delete a single authentication Profile', () => {
    nock(apiUrl, {})
      .delete(/\/authentication-realms\/(.*)\/profiles\/oidc\/(.*)/)
      .reply(204)

    const profileId = '7e6645ef-0084-4928-b9b4-d2fe5577f70e'

    Moltin.AuthenticationProfile.Delete(realmId, profileId).then(res => {
      assert.equal(res, '{}')
    }).catch(err=>console.error(err))
  })
})
