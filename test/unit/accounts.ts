import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  storesArray as stores,
  keysArray as keys,
  account,
  auth
} from '../factories'

const apiUrl = 'https://api.moltin.com/v1'
const accessToken = 'testaccesstoken'

describe('Moltin accounts', () => {
  const Moltin = MoltinGateway({
    custom_authenticator: () => auth(accessToken)
  })

  it('should return an account', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts')
      .reply(200, { data: account })

    return Moltin.Accounts.All().then(response => {
      assert.propertyVal(response.data, 'id', '123')
    })
  })

  it('should return an array of stores', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts/stores')
      .reply(200, { data: stores })

    return Moltin.Accounts.Stores().then(response => {
      assert.lengthOf(response.data, 2)
    })
  })

  it('should return an a single store', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts/stores/store-1')
      .reply(200, { data: stores[0] })

    return Moltin.Accounts.Store('store-1').then(response => {
      assert.propertyVal(response.data, 'id', 'store-1')
    })
  })

  it('should switch store', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/account/stores/switch/store-1')
      .reply(200, {
        data: {
          status: 200,
          title: 'Store switched successfully to: store-1'
        }
      })

    return Moltin.Accounts.SwitchStore('store-1').then(response => {
      assert.propertyVal(
        response.data,
        'title',
        'Store switched successfully to: store-1'
      )
    })
  })

  it('should return an array of keys', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts/keys')
      .reply(200, { data: keys })

    return Moltin.Accounts.Keys().then(response => {
      assert.lengthOf(response.data, 2)
    })
  })

  it('should delete a user from a store', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .delete('/accounts/stores/store-1/users/user-1')
      .reply(204)

    return Moltin.Accounts.DeleteUserFromStore('store-1', 'user-1').then(
      response => {
        assert.equal(response, '{}')
      }
    )
  })

  it('should add a user to a store', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .post('/accounts/stores/store-1/users')
      .reply(200, { data: 'User added to store', status: true })

    return Moltin.Accounts.AddUserToStore('store-1', {
      name: 'test-user',
      email: 'testuser@test.com',
      role: 1
    }).then(response => {
      assert.propertyVal(response, 'data', 'User added to store')
      assert.propertyVal(response, 'status', true)
    })
  })

  it('should return an account', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .get('/accounts')
      .reply(200, { data: account })

    return Moltin.Accounts.Me().then(response => {
      assert.propertyVal(response.data, 'id', '123')
    })
  })

  it('should update an account', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
      .put('/accounts/users', {
        data: {
          job_title: 'Developer'
        }
      })
      .reply(204)

    return Moltin.Accounts.UpdateMe({ job_title: 'Developer' }).then(
      response => {
        assert.equal(response, '{}')
      }
    )
  })
})
