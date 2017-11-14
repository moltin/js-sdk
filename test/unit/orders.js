import { assert } from 'chai';
import nock from 'nock';
import { gateway as MoltinGateway } from '../../src/moltin';
import { ordersArray as orders, orderItemsArray as orderItems, orderTransactionsArray as orderTransactions } from '../factories';

const apiUrl = 'https://api.moltin.com/v2';

describe('Moltin orders', () => {
  const Moltin = MoltinGateway({
    client_id: 'XXX',
  });

  it('should return an array of orders', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/orders')
    .reply(200, orders);

    return Moltin.Orders.All()
    .then((response) => {
      assert.lengthOf(response, 4);
      assert.propertyVal(response[0], 'id', 'order-1');
    });
  });

  it('should return an array of orders from a specified customer', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken',
      },
    })
    .get('/orders')
    .reply(200, orders);

    return Moltin.Orders.All('testtoken')
    .then((response) => {
      assert.lengthOf(response, 4);
      assert.propertyVal(response[0], 'id', 'order-1');
    });
  });

  it('should return a single order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/orders/order-1')
    .reply(200, orders[0]);

    return Moltin.Orders.Get(orders[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'order-1');
      assert.propertyVal(response, 'status', 'complete');
    });
  });

  it('should return an array of items from an order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/orders/order-1/items')
    .reply(200, orderItems[0]);

    return Moltin.Orders.Items(orders[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'item-1');
      assert.propertyVal(response, 'product_id', 'product-1');
    });
  });

  it('should return an array of transactions from an order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .get('/orders/order-1/transactions')
    .reply(200, orderTransactions[0]);

    return Moltin.Orders.Transactions(orders[0].id)
    .then((response) => {
      assert.propertyVal(response, 'id', 'transaction-1');
      assert.nestedPropertyVal(response, 'relationships.order.data.id', 'c5530906-7b68-42ee-99c3-68cfebdcd749');
    });
  });

  it('should complete a payment for an order', () => {
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
      },
    })
    .post('/orders/order-2/payments', {
      data: {
        gateway: 'braintree',
        method: 'purchase',
        customer_id: '3',
      },
    })
    .reply(201, {
      status: 'complete',
    });

    return Moltin.Orders.Payment(orders[1].id, {
      gateway: 'braintree',
      method: 'purchase',
      customer_id: '3',
    })
    .then((response) => {
      assert.propertyVal(response, 'status', 'complete');
    });
  });
});
