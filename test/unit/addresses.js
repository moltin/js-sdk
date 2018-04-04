import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import { addressesArray as addresses } from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin addresses', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('should return an array of customer addresses', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers/customer-1/addresses')
      .reply(200, addresses)

    return Moltin.Addresses.All({ customer: 'customer-1' }).then(response => {
      assert.lengthOf(response, 2)
    })
  })

  it('should return an array of customer addresses using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/customers/customer-1/addresses')
      .reply(200, addresses)

    return Moltin.Addresses.All({
      customer: 'customer-1',
      token: 'testtoken'
    }).then(response => {
      assert.lengthOf(response, 2)
    })
  })

  it('should return a single customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers/customer-1/addresses/address-1')
      .reply(200, addresses[0])

    return Moltin.Addresses.Get({
      customer: 'customer-1',
      address: 'address-1'
    }).then(response => {
      assert.propertyVal(response, 'id', 'address-1')
    })
  })

  it('should return a single customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/customers/customer-1/addresses/address-1')
      .reply(200, addresses[0])

    return Moltin.Addresses.Get({
      customer: 'customer-1',
      address: 'address-1',
      token: 'testtoken'
    }).then(response => {
      assert.propertyVal(response, 'id', 'address-1')
    })
  })

  it('should create a new customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/customers/customer-1/addresses', {
        data: {
          type: 'address',
          name: 'Office'
        }
      })
      .reply(201, {
        name: 'Office'
      })

    return Moltin.Addresses.Create({
      customer: 'customer-1',
      body: { name: 'Office' }
    }).then(response => {
      assert.propertyVal(response, 'name', 'Office')
    })
  })

  it('should create a new customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .post('/customers/customer-1/addresses', {
        data: {
          type: 'address',
          name: 'Office'
        }
      })
      .reply(201, {
        name: 'Office'
      })

    return Moltin.Addresses.Create({
      customer: 'customer-1',
      body: { name: 'Office' },
      token: 'testtoken'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Office')
    })
  })

  it('should update a customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/customers/customer-1/addresses/address-1', {
        data: {
          type: 'address',
          name: 'Updated address name'
        }
      })
      .reply(200, {
        name: 'Updated address name'
      })

    return Moltin.Addresses.Update({
      customer: 'customer-1',
      address: 'address-1',
      body: { name: 'Updated address name' }
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated address name')
    })
  })

  it('should update a customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .put('/customers/customer-1/addresses/address-1', {
        data: {
          type: 'address',
          name: 'Updated address name'
        }
      })
      .reply(200, {
        name: 'Updated address name'
      })

    return Moltin.Addresses.Update({
      customer: 'customer-1',
      address: 'address-1',
      body: { name: 'Updated address name' },
      token: 'testtoken'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated address name')
    })
  })

  it('should delete a customer address', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/customers/customer-1/addresses/address-1')
      .reply(204)

    return Moltin.Addresses.Delete({
      customer: 'customer-1',
      address: 'address-1'
    }).then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should delete a customer address using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .delete('/customers/customer-1/addresses/address-1')
      .reply(204)

    return Moltin.Addresses.Delete({
      customer: 'customer-1',
      address: 'address-1',
      token: 'testtoken'
    }).then(response => {
      assert.equal(response, '{}')
    })
  })
})
