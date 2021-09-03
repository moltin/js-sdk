import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import { attributeResponse, customersArray as customers } from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin customers', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX'
  })

  it('should return an array of customers', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers')
      .reply(200, { data: customers })

    return Moltin.Customers.All().then(response => {
      assert.lengthOf(response.data, 2)
    })
  })

  it('should return a single customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers/1')
      .reply(200, customers[0])

    return Moltin.Customers.Get('1').then(response => {
      assert.propertyVal(response, 'id', 'customer-1')
    })
  })

  it('should return a single customer using a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/customers/1')
      .reply(200, customers[0])

    return Moltin.Customers.Get('1', 'testtoken').then(response => {
      assert.propertyVal(response, 'id', 'customer-1')
    })
  })

  it('should return a filtered array of customers', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers?filter=eq(email,jonathan@moltin.com):like(name,jon)')
      .reply(200, { data: customers })

    return Moltin.Customers.Filter({
      eq: {
        email: 'jonathan@moltin.com'
      },
      like: {
        name: 'jon'
      }
    })
      .All()
      .then(response => {
        assert.lengthOf(response.data, 2)
      })
  })

  it('should create a new customer', () => {
    const newCustomer = {
      type: 'customer',
      name: 'Max Power',
      email: 'max@power.com',
      password: 'fakepass'
    }

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/customers')
      .reply(201, { data: { ...newCustomer, id: 'cus1' } })

    return Moltin.Customers.Create(newCustomer).then(response => {
      assert.equal(response.data.id, 'cus1')
      assert.equal(response.data.type, newCustomer.type)
      assert.equal(response.data.name, newCustomer.name)
      assert.equal(response.data.email, newCustomer.email)
      assert.equal(response.data.password, newCustomer.password)
    })
  })

  it('should update a customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/customers/customer-1', {
        data: {
          type: 'customer',
          name: 'Updated customer name'
        }
      })
      .reply(200, {
        name: 'Updated customer name'
      })

    return Moltin.Customers.Update('customer-1', {
      name: 'Updated customer name'
    }).then(response => {
      assert.propertyVal(response, 'name', 'Updated customer name')
    })
  })

  it('should update a customer with X-MOLTIN-CUSTOMER-TOKEN header', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .put('/customers/customer-1', {
        data: {
          type: 'customer',
          name: 'Updated customer name'
        }
      })
      .reply(200, {
        name: 'Updated customer name'
      })

    return Moltin.Customers.Update(
      'customer-1',
      { name: 'Updated customer name' },
      'testtoken'
    ).then(response => {
      assert.propertyVal(response, 'name', 'Updated customer name')
    })
  })

  it('should delete a customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .delete('/customers/customer-1')
      .reply(204)

    return Moltin.Customers.Delete('customer-1').then(response => {
      assert.equal(response, '{}')
    })
  })

  it('should authenticate a customer and return a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/customers/tokens', {
        data: {
          type: 'token',
          authentication_mechanism: "password",
          email: customers[0].email,
          password: customers[0].password
        }
      })
      .reply(201, {
        customer_id: customers[0].id,
        token: customers[0].token
      })

    return Moltin.Customers.Token(
      customers[0].email,
      customers[0].password
    ).then(response => {
      assert.propertyVal(response, 'token', 'eyAgICJhbGciOiAiSFMyNTYiLCAgICJ0')
      assert.propertyVal(response, 'customer_id', 'customer-1')
    })
  })

  it('should authenticate a customer and return a JWT when using oidc', () => {
    const someAuthorizationCode = "c87fec2c-5b08-4cd8-842c-2b3816240dce"
    const someCodeVerifier = "6Z4X0ZPqz~LKQ.R~8ILi54xKXKK5WQF2W~OI-Wq7AIvOuG25AhrHkR2-bOP~5oKOTXspmpAgYidnvP9KnKxPFvgTzXBWi4rYtq428zW4aGRY1SXGargvLYBj39DWKvHf"
    const someRedirectUri = "https://www.elasticpath.com"

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/customers/tokens', {
        data: {
          type: 'token',
          authentication_mechanism: "oidc",
          oauth_authorization_code: someAuthorizationCode,
          oauth_redirect_uri: someRedirectUri,
          oauth_code_verifier: someCodeVerifier,
        }
      })
      .reply(201, {
        customer_id: customers[0].id,
        token: customers[0].token
      })

    return Moltin.Customers.TokenViaOIDC(
      someAuthorizationCode,
      someRedirectUri,
      someCodeVerifier
    ).then(response => {
      assert.propertyVal(response, 'token', 'eyAgICJhbGciOiAiSFMyNTYiLCAgICJ0')
      assert.propertyVal(response, 'customer_id', 'customer-1')
    })
  })


  it('should not persist the filter property after request', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers?filter=eq(email,jonathan@moltin.com)')
      .reply(200, customers)

    return Moltin.Customers.Filter({
      eq: {
        email: 'jonathan@moltin.com'
      }
    })
      .All()
      .then(() => {
        assert.notExists((Moltin.Customers as any).filter)
      })
  })

  it('should return an array of attributes', () => {
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/customers/attributes')
      .reply(200, attributeResponse)

    return Moltin.Customers.Attributes('testtoken').then(response => {
      assert.lengthOf(response.data, 3)
    })
  })
})
