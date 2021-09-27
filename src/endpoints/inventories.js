import BaseExtend from '../extends/base'

class InventoriesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'inventories'
  }

  Create(productId, quantity) {
    return this.request.send(`${this.endpoint}/${productId}`, 'POST', {
      quantity
    })
  }

  Delete(productId) {
    return this.request.send(`${this.endpoint}/${productId}`, 'DELETE')
  }

  IncrementStock(productId, quantity) {
    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      { action: 'increment', quantity, type: 'stock-transaction' }
    )
  }

  DecrementStock(productId, quantity) {
    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      { action: 'decrement', quantity, type: 'stock-transaction' }
    )
  }

  AllocateStock(productId, quantity) {
    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      { action: 'allocate', quantity, type: 'stock-transaction' }
    )
  }

  DeallocateStock(productId, quantity) {
    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      { action: 'deallocate', quantity, type: 'stock-transaction' }
    )
  }

  GetTransactions(productId) {
    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'GET'
    )
  }

  GetTransaction(productId, transactionId) {
    return this.request.send(
      `${this.endpoint}/${productId}/transactions/${transactionId}`,
      'GET'
    )
  }
}

export default InventoriesEndpoint
