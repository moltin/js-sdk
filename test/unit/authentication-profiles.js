import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Authentication Profiles', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  // Random ID
  const realmId = 'af82e5ce-82b7-4955-ac7c-692d76e9f813'

  it('Get all Profiles', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/profiles\/oidc/)
      .reply(200, {})

    Moltin.AuthenticationProfiles.All(
      'af82e5ce-82b7-4955-ac7c-692d76e9f813'
    ).then(res => {
      assert.isObject(res)
    })
  })

  it('Get a single Profile', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/profiles\/oidc\/(.*)/)
      .reply(200, {})

    Moltin.AuthenticationProfiles.Get({
      realmId,
      profileId: 'e1b5c7fa-f2b6-48d2-b659-3d82f20968a9'
    }).then(res => {
      assert.isObject(res)
    })
  })

  it('Create a single authentication Profile', () => {
    nock(apiUrl, {})
      .post(/\/authentication-realms\/(.*)\/profiles\/oidc/)
      .reply(201, {})

    const body = {
      data: {
        name: 'Keycloak',
        type: 'authentication-profile-oidc',
        discovery_url:
          'http://localhost:24074/auth/realms/Sample/.well-known/openid-configuration',
        client_id: 'openid-client',
        client_secret: 'ba5eba11-affec7ed-c0ff1e'
      }
    }

    Moltin.AuthenticationProfiles.Create(realmId, body).then(res => {
      assert.isObject(res)
    })
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

    Moltin.AuthenticationProfiles.Update(realmId, profileId, body).then(res => {
      assert.isObject(res)
    })
  })

  it('Delete a single authentication Profile', () => {
    nock(apiUrl, {})
      .delete(/\/authentication-realms\/(.*)\/profiles\/oidc\/(.*)/)
      .reply(201, {})

    const profileId = '7e6645ef-0084-4928-b9b4-d2fe5577f70e'

    Moltin.AuthenticationProfiles.Delete(realmId, profileId).then(res => {
      assert.isObject(res)
    })
  })
})
