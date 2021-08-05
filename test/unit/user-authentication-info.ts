import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'

const apiUrl = 'https://api.moltin.com/v2'

describe('User Authentication Info', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  const realmId = '96764ca9-af12-4355-acce-37fa2ef4728a'
  const userAuthenticationId = '4da65e78-7f9b-4248-b498-823d43120da9'

  it('Read All User Authentication Info', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/user-authentication-info/)
      .reply(200, {})

    return Moltin.UserAuthenticationInfo.All(realmId).then(res => {
      assert.isObject(res)
    })
  })

  it('Filter User Authentication Info', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/user-authentication-info/)
      .reply(200, {
        data: [
          {
            id: '3b598653-0478-4140-b35f-84aab8eca7fc',
            name: 'Jane',
            email: 'jane.doe@banks.com',
            type: 'user_authentication_info'
          }
        ]
      })

    return Moltin.UserAuthenticationInfo.Filter({
      eq: { name: 'jane' }
    })
      .All(realmId)
      .then(res => {
        assert.isObject(res)
        assert.equal(res.data.length, 1)
      })
  })

  it('Get a single User Authentication Info', () => {
    nock(apiUrl, {})
      .get(/\/authentication-realms\/(.*)\/user-authentication-info\/(.*)/)
      .reply(200, {})

    return Moltin.UserAuthenticationInfo.Get(
      realmId,
      userAuthenticationId
    ).then(res => {
      assert.isObject(res)
    })
  })

  it('Create a single User Authentication Info', () => {
    nock(apiUrl, {})
      .post(/\/authentication-realms\/(.*)\/user-authentication-info/)
      .reply(201, {})

    const body = {
      type: 'user_authentication_info',
      name: 'John Doe',
      email: 'john.doe@banks.com'
    }

    return Moltin.UserAuthenticationInfo.Create(realmId, { data: body }).then(
      res => {
        assert.isObject(res)
      }
    )
  })

  it('Update a ingle User Authentication Info', () => {
    nock(apiUrl, {})
      .put(/\/authentication-realms\/(.*)\/user-authentication-info\/(.*)/)
      .reply(201, {})

    const body = {
      type: 'user_authentication_info',
      name: 'John Doe',
      email: 'john.doe@banks.com'
    }

    return Moltin.UserAuthenticationInfo.Update(realmId, userAuthenticationId, {
      data: body
    }).then(res => {
      assert.isObject(res)
    })
  })

  it('Delete a single User Authentication Info', () => {
    nock(apiUrl, {})
      .delete(/\/authentication-realms\/(.*)\/user-authentication-info\/(.*)/)
      .reply(204)

    return Moltin.UserAuthenticationInfo.Delete(
      realmId,
      userAuthenticationId
    ).then(res => {
      assert.equal(res, '{}')
    })
  })
})
