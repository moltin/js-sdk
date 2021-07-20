import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('Oidc Profiles', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  const realmId = '96764ca9-af12-4355-acce-37fa2ef4728a'

  it('Get all Oidc Profiles', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/oidc-profiles/)
      .reply(200, {})

    return Moltin.OidcProfile.All(realmId).then(res => {
      assert.isObject(res)
    })
  })

  it('Get a single Oidc Profile', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/oidc-profiles\/(.*)/)
      .reply(200, {})

    return Moltin.OidcProfile.Get({
      realmId,
      profileId: '4da65e78-7f9b-4248-b498-823d43120da9'
    }).then(res => {
      assert.isObject(res)
    })
  })

  it('Create a single Oidc Profile', () => {
    nock(apiUrl, {})
      .post(/\/authentication-realms\/(.*)\/oidc-profiles/)
      .reply(201, {})

    const body = {
      name: 'Keycloak',
      type: 'oidc-profile',
      discovery_url: 'https://localhost:3000/discovery_url',
      client_id: 'test-client',
      client_secret: 'XXXXXX'
    }

    return Moltin.OidcProfile.Create(realmId, {data:body}).then(res => {
      assert.isObject(res)
    })
  })

  it('Update a single Oidc Profile', () => {
    nock(apiUrl, {})
      .put(/\/authentication-realms\/(.*)\/oidc-profiles\/(.*)/)
      .reply(201, {})

    const body = {
      name: 'Keycloak 2',
      type: 'oidc-profile',
      discovery_url:
        'http://localhost:24074/auth/realms/Sample/.well-known/openid-configuration',
      client_id: 'openid-client',
      client_secret: 'ba5eba11-affec7ed-c0ff1e'
    }

    const profileId = 'e1b5c7fa-f2b6-48d2-b659-3d82f20968a9'

    return Moltin.OidcProfile.Update(realmId, profileId, {data:body}).then(res => {
        assert.isObject(res)
    })
  })

  it('Delete a single Oidc Profile', () => {
    nock(apiUrl, {})
      .delete(/\/authentication-realms\/(.*)\/oidc-profiles\/(.*)/)
      .reply(204)

    const profileId = '7e6645ef-0084-4928-b9b4-d2fe5577f70e'

    return Moltin.OidcProfile.Delete(realmId, profileId).then(res => {
      assert.equal(res, '{}')
    })
  })
})
