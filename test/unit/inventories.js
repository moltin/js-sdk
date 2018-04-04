import { assert } from 'chai'
import nock from 'nock'
import { gateway as MoltinGateway } from '../../src/moltin'
import {
  inventoriesArray as inventories,
  stockTransactionsArray as transactions
} from '../factories'

const apiUrl = 'https://api.moltin.com/v2'

describe('Moltin inventories', () => {
  it('should return an array of inventories', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/inventories')
      .reply(200, inventories)

    return Moltin.Inventories.All().then(response => {
      assert.lengthOf(response, 2)
    })
  })

  it('should return a single product inventory', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    // Intercept the API request
    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/inventories/inventory-1')
      .reply(200, inventories[0])

    return Moltin.Inventories.Get('inventory-1').then(response => {
      assert.propertyVal(response, 'total', 10)
    })
  })

  it('should return an array inventory transactions for specific product', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .get('/inventories/managed-product-1/transactions')
      .reply(200, transactions)

    return Moltin.Inventories.GetTransactions('managed-product-1').then(
      response => {
        assert.lengthOf(response, 2)
      }
    )
  })

  it('should increment stock', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/inventories/managed-product-1/transactions', {
        data: {
          quantity: 100,
          action: 'increment',
          type: 'stock-transaction'
        }
      })
      .reply(201, {
        product_id: 'managed-product-1',
        quantity: 100,
        action: 'increment',
        type: 'stock-transaction'
      })

    return Moltin.Inventories.IncrementStock('managed-product-1', 100).then(
      response => {
        assert.propertyVal(response, 'product_id', 'managed-product-1')
        assert.propertyVal(response, 'quantity', 100)
        assert.propertyVal(response, 'action', 'increment')
        assert.propertyVal(response, 'type', 'stock-transaction')
      }
    )
  })

  it('should decrement stock', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/inventories/managed-product-1/transactions', {
        data: {
          quantity: 50,
          action: 'decrement',
          type: 'stock-transaction'
        }
      })
      .reply(201, {
        product_id: 'managed-product-1',
        quantity: 50,
        action: 'decrement',
        type: 'stock-transaction'
      })

    return Moltin.Inventories.DecrementStock('managed-product-1', 50).then(
      response => {
        assert.propertyVal(response, 'product_id', 'managed-product-1')
        assert.propertyVal(response, 'quantity', 50)
        assert.propertyVal(response, 'action', 'decrement')
        assert.propertyVal(response, 'type', 'stock-transaction')
      }
    )
  })

  it('should allocate stock', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/inventories/managed-product-1/transactions', {
        data: {
          quantity: 10,
          action: 'allocate',
          type: 'stock-transaction'
        }
      })
      .reply(201, {
        product_id: 'managed-product-1',
        quantity: 10,
        action: 'allocate',
        type: 'stock-transaction'
      })

    return Moltin.Inventories.AllocateStock('managed-product-1', 10).then(
      response => {
        assert.propertyVal(response, 'product_id', 'managed-product-1')
        assert.propertyVal(response, 'quantity', 10)
        assert.propertyVal(response, 'action', 'allocate')
        assert.propertyVal(response, 'type', 'stock-transaction')
      }
    )
  })

  it('should deallocate stock', () => {
    const Moltin = MoltinGateway({
      client_id: 'XXX'
    })

    nock(apiUrl, {
      reqheaders: {
        Authorization: 'Bearer: a550d8cbd4a4627013452359ab69694cd446615a'
      }
    })
      .post('/inventories/managed-product-1/transactions', {
        data: {
          quantity: 10,
          action: 'deallocate',
          type: 'stock-transaction'
        }
      })
      .reply(201, {
        product_id: 'managed-product-1',
        quantity: 10,
        action: 'deallocate',
        type: 'stock-transaction'
      })

    return Moltin.Inventories.DeallocateStock('managed-product-1', 10).then(
      response => {
        assert.propertyVal(response, 'product_id', 'managed-product-1')
        assert.propertyVal(response, 'quantity', 10)
        assert.propertyVal(response, 'action', 'deallocate')
        assert.propertyVal(response, 'type', 'stock-transaction')
      }
    )
  })
})
