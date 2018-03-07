import CatalogueExtend from '../extends/catalogue'

class InventoriesEndpoint extends CatalogueExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'inventories'
  }

  All() {
    return this.request.send(`${this.endpoint}`, 'GET')
  }

  Get(productId) {
    return this.request.send(`${this.endpoint}/${productId}`, 'GET')
  }

  IncrementStock(productId, quantity) {
    const body = {
      type: 'stock-transaction',
      action: 'increment',
      quantity
    }

    return this.request.send(`${this.endpoint}/${productId}`, 'POST', body)
  }

  DecrementStock(productId, quantity) {
    const body = {
      type: 'stock-transaction',
      action: 'decrement',
      quantity
    }

    return this.request.send(`${this.endpoint}/${productId}`, 'POST', body)
  }

  GetTransactions(productId) {
    return this.request.send(`${this.endpoint}/${productId}/transactions`, 'GET')
  }
}

export default InventoriesEndpoint
