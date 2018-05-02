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
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders')
      .reply(200, orders)

    return Moltin.Orders.All().then(response => {
      assert.lengthOf(response, 4)
      assert.propertyVal(response[0], 'id', 'order-1')
    })
  })

  it('should return an array of orders from a specified customer', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/orders')
      .reply(200, orders)

    return Moltin.Orders.All('testtoken').then(response => {
      assert.lengthOf(response, 4)
      assert.propertyVal(response[0], 'id', 'order-1')
    })
  })

  it('should return an array of orders and include associated items', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders')
      .query({
        include: 'items'
      })
      .reply(200, orders)

    return Moltin.Orders.With('items')
      .All()
      .then(response => {
        assert.lengthOf(response, 4)
      })
  })

  it('should return an array of orders from a specified customer and include associated items', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
        'X-MOLTIN-CUSTOMER-TOKEN': 'testtoken'
      }
    })
      .get('/orders')
      .query({
        include: 'items'
      })
      .reply(200, orders)

    return Moltin.Orders.With('items')
      .All('testtoken')
      .then(response => {
        assert.lengthOf(response, 4)
      })
  })

  it('should return a single order', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/orders/order-1')
      .reply(200, orders[0])

    return Moltin.Orders.Get(orders[0].id).then(response => {
      assert.propertyVal(response, 'id', 'order-1')
      assert.propertyVal(response, 'status', 'complete')
    })
  })

  it('should return a single order using a JWT', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a',
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
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
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
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/orders/order-2/payments', {
        data: {
          gateway: 'braintree',
          method: 'purchase',
          customer_id: '3'
        }
      })
      .reply(201, {
        status: 'complete'
      })

    return Moltin.Orders.Payment(orders[1].id, {
      gateway: 'braintree',
      method: 'purchase',
      customer_id: '3'
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
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
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
})
