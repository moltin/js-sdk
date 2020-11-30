import { assert } from 'chai'
import nock from 'nock'
import fetch from 'cross-fetch'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com'
const authExpire = 9999999999

describe('Moltin authentication', () => {
  it('should return an access token', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .post('/oauth/access_token', {
        grant_type: 'implicit',
        client_id: 'XXX'
      })
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
        expires: authExpire
      })

    return Moltin.Authenticate().then(response => {
      assert.equal(
        response.access_token,
        'a550d8cbd4a4627013452359ab69694cd446615a'
      )
      assert.equal(response.expires, authExpire)
    })
  })

  it('should throw an error when no client id is set', () => {
    const Moltin = MoltinGateway({
      client_id: ''
    })

    assert.throws(
      () => Moltin.Authenticate(),
      Error,
      /You must have a client_id set/
    )
  })

  it('should return an access token using custom_fetch', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX',
      custom_fetch: fetch
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .post('/oauth/access_token', {
        grant_type: 'implicit',
        client_id: 'XXX'
      })
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
        expires: authExpire
      })

    return Moltin.Authenticate().then(response => {
      assert.equal(
        response.access_token,
        'a550d8cbd4a4627013452359ab69694cd446615a'
      )
      assert.equal(response.expires, authExpire)
    })
  })

  it('should fallback to default API host if host is undefined during instantiation', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX',
      host: undefined
    })

    assert.equal(Moltin.config.host, 'api.moltin.com')
  })

  it('should use a custom API host', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX',
      host: 'api.test.test'
    })

    assert.equal(Moltin.config.host, 'api.test.test')
  })

  it('should cache authentication details', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .post('/oauth/access_token', {
        grant_type: 'implicit',
        client_id: 'XXX'
      })
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
        expires: authExpire
      })

    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    Moltin.Authenticate().then(() => {
      const { storage } = Moltin.request
      assert.exists(storage.get('moltinCredentials'))
    })
  })

  it('should clear cache if client ID is different', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .post('/oauth/access_token', {
        grant_type: 'implicit',
        client_id: 'YYY'
      })
      .reply(200, {
        access_token: 'a550d8cbd4a4627013452359ab69694cd446615b',
        expires: authExpire
      })

    let Moltin = MoltinGateway({
      client_id: 'YYY'
    })

    return Moltin.Authenticate().then(() => {
      const { storage } = Moltin.request
      let credentials = JSON.parse(storage.get('moltinCredentials'))
      assert.equal(
        credentials.access_token,
        'a550d8cbd4a4627013452359ab69694cd446615b'
      )

      // Intercept the API request
      nock(apiUrl, {
        reqheaders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .post('/oauth/access_token', {
          grant_type: 'implicit',
          client_id: 'XXX'
        })
        .reply(200, {
          access_token: 'a550d8cbd4a4627013452359ab69694cd446615a',
          expires: authExpire
        })

      Moltin = MoltinGateway({
        client_id: 'XXX'
      })

      return Moltin.Authenticate().then(() => {
        const { storage: storage2 } = Moltin.request
        credentials = JSON.parse(storage2.get('moltinCredentials'))
        assert.equal(
          credentials.access_token,
          'a550d8cbd4a4627013452359ab69694cd446615a'
        )
      })
    })
  })
})
