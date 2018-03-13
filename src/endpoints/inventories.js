import BaseExtend from '../extends/base';

class InventoriesEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint);

    this.endpoint = 'inventories';

    this.transactionObject = {
      type: 'stock-transaction'
    };
  }

  Get(productId) {
    return this.request.send(`${this.endpoint}/${productId}`, 'GET');
  }

  IncrementStock(productId, quantity) {
    const body = Object.assign({}, this.transactionObject, {
      action: 'increment',
      quantity
    });

    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      body
    );
  }

  DecrementStock(productId, quantity) {
    const body = Object.assign({}, this.transactionObject, {
      action: 'decrement',
      quantity
    });

    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      body
    );
  }

  AllocateStock(productId, quantity) {
    const body = Object.assign({}, this.transactionObject, {
      action: 'allocate',
      quantity
    });

    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      body
    );
  }

  DeallocateStock(productId, quantity) {
    const body = Object.assign({}, this.transactionObject, {
      action: 'deallocate',
      quantity
    });

    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'POST',
      body
    );
  }

  GetTransactions(productId) {
    return this.request.send(
      `${this.endpoint}/${productId}/transactions`,
      'GET'
    );
  }
}

export default InventoriesEndpoint;
