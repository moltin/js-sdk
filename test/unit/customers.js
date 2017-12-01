import { assert } from 'chai';
import nock from 'nock';
import { gateway as MoltinGateway } from '../../src/moltin';
import { customersArray as customers } from '../factories';

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin customers', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
  });

  it('should return an array of customers', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/customers')
    .reply(200, customers);

    return Moltin.Customers.All()
    .then((response) => {
      assert.lengthOf(response, 2);
    });
  });

  it('should return a single customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/customers/1')
    .reply(200, customers[0]);

    return Moltin.Customers.Get(1)
    .then((response) => {
      assert.propertyVal(response, 'id', 'customer-1');
    });
  });

  it('should create a new customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/customers', {
      data: {
        username: 'maximusPowerus',
        name: 'Max Power',
        email: 'max@power.com',
        password: 'fakepass',
      },
    })
    .reply(201, {
      username: 'maximusPowerus',
      name: 'Max Power',
      email: 'max@power.com',
    });

    return Moltin.Customers.Create({
      username: 'maximusPowerus',
      name: 'Max Power',
      email: 'max@power.com',
      password: 'fakepass',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'Max Power');
    });
  });

  it('should update a customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .put('/customers/customer-1', {
      data: {
        name: 'Updated customer name',
      },
    })
    .reply(200, {
      name: 'Updated customer name',
    });

    return Moltin.Customers.Update('customer-1', {
      name: 'Updated customer name',
    })
    .then((response) => {
      assert.propertyVal(response, 'name', 'Updated customer name');
    });
  });

  it('should delete a customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .delete('/customers/customer-1')
    .reply(204);

    return Moltin.Customers.Delete('customer-1')
    .then((response) => {
      assert.equal(response, '{}');
    });
  });

  it('should authenticate a customer and return a JWT', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/customers/tokens', {
      data: {
        type: 'token',
        email: customers[0].email,
        password: customers[0].password,
      },
    })
    .reply(201, {
      customer_id: customers[0].id,
      token: customers[0].token,
    });

    return Moltin.Customers.Token(customers[0].email, customers[0].password)
    .then((response) => {
      assert.propertyVal(response, 'token', 'eyAgICJhbGciOiAiSFMyNTYiLCAgICJ0');
      assert.propertyVal(response, 'customer_id', 'customer-1');
    });
  });
});
