import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  ordersArray as orders,
  orderItemsArray as orderItems
} from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin orders', () => {
  it('should return an array of orders', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders')
      .reply(200, { data: orders })

    return Moltin.Orders.All().then(response => {
      assert.lengthOf(response.data, 4)
      assert.propertyVal(response.data[0], 'id', 'order-1')
    })
  })

  it('should return an array of orders from a specified customer', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/orders')
      .reply(200, { data: orders })

    return Moltin.Orders.All('testtoken').then(response => {
      assert.lengthOf(response.data, 4)
      assert.propertyVal(response.data[0], 'id', 'order-1')
    })
  })

  it('should return an array of orders and include associated items', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders')
      .query({
        include: 'items'
      })
      .reply(200, { data: orders })

    return Moltin.Orders.With('items')
      .All()
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should return an array of orders from a specified customer and include associated items', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/orders')
      .query({
        include: 'items'
      })
      .reply(200, { data: orders })

    return Moltin.Orders.With('items')
      .All('testtoken')
      .then(response => {
        assert.lengthOf(response.data, 4)
      })
  })

  it('should return a single order', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders/order-1')
      .reply(200, orders[0])

    return Moltin.Orders.Get(orders[0].id).then(response => {
      assert.propertyVal(response, 'id', 'order-1')
      assert.propertyVal(response, 'status', 'complete')
    })
  })

  it('should return a single order include account and account_member', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
        .get('/orders/order-1?include=account,account_member')
        .reply(200, orders[0])

    return Moltin.Orders.With(['account', 'account_member']).Get(orders[0].id).then((response:any) => {
      assert.propertyVal(response, 'id', 'order-1')
      assert.propertyVal(response, 'status', 'complete')
      assert.lengthOf(response.included.accounts, 1)
      assert.lengthOf(response.included.account_members, 1)
    })
  })

  it('should return a single order using a JWT', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/orders/order-1')
      .reply(200, orders[0])

    return Moltin.Orders.Get(orders[0].id, 'testtoken').then(response => {
      assert.propertyVal(response, 'id', 'order-1')
      assert.propertyVal(response, 'status', 'complete')
    })
  })

  it('should return an array of items from an order', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders/order-1/items')
      .reply(200, orderItems[0])

    return Moltin.Orders.Items(orders[0].id).then(response => {
      assert.propertyVal(response, 'id', 'item-1')
      assert.propertyVal(response, 'product_id', 'product-1')
    })
  })

  it('should complete a payment for an order', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/orders/order-2/payments', {
        data: {
          gateway: 'braintree',
          method: 'purchase',
          payment: '3'
        }
      })
      .reply(201, {
        status: 'complete'
      })

    return Moltin.Orders.Payment(orders[1].id, {
      gateway: 'braintree',
      method: 'purchase',
      payment: '3'
    }).then(response => {
      assert.propertyVal(response, 'status', 'complete')
    })
  })

  it('should confirm a payment for an order', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })
    const transactionId = '1'
    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/orders/order-2/transactions/1/confirm', {
        data: {
          gateway: 'purchase',
          payment: 'test',
          method: 'payment_intents'
        }
      })
      .reply(201, {
        status: 'complete'
      })

    return Moltin.Orders.Confirm(orders[1].id, transactionId, {
      gateway: 'purchase',
      payment: 'test',
      method: 'payment_intents'
    }).then(response => {
      assert.propertyVal(response, 'status', 'complete')
    })
  })

  it('should update an order', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .put('/orders/order-1', {
        data: {
          type: 'order',
          shipping: 'fulfilled'
        }
      })
      .reply(200, {
        shipping: 'fulfilled'
      })

    return Moltin.Orders.Update(orders[0].id, {
      shipping: 'fulfilled'
    }).then(response => {
      assert.propertyVal(response, 'shipping', 'fulfilled')
    })
  })

  it('should not persist the includes property after request', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders')
      .query({
        include: 'items'
      })
      .reply(200, { data: orders })

    return Moltin.Orders.With('items')
      .All()
      .then(() => {
        assert.notExists((Moltin.Orders as any).includes)
      })
  })

  it('should get orders attributes', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders/attributes')
      .reply(200, {})

    return Moltin.Orders.Attributes('1')
  })
})
