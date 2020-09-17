import { assert } from 'chai'
// import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

// const apiUrl = 'https://api.moltin.com/v2'

// TODO: see if we can get the authentication realms locally...

describe('Moltin Authentication Settings', () => {
  // const Moltin = MoltinGateway({
  //   client_id: 'XXX'
  // })
  const Moltin = MoltinGateway({
    client_id: 'XXX',
    host: 'localhost:8000',
    protocol: 'http'
  })

  it('Get all Settings', () =>
    // nock(apiUrl, {})
    //   .get('/authentication-realms')
    //   .reply(200, {})

    Moltin.AuthenticationSettings.Get({
      storeId: '15ea9633-278c-4807-80f7-2009fed63c7e'
    }).then(res => {
      assert.isObject(res)
    }))
})
