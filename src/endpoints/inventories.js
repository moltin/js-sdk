import BaseExtend from '../extends/base'

class InventoriesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'inventories'
  }

  Get(productId) {
    return this.request.send(`${this.endpoint}/${productId}`, 'GET')
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
}

export default InventoriesEndpoint
