import BaseExtend from '../extends/base'

class TransactionsEndpoint extends BaseExtend {
  constructor(endpoint) {
    super(endpoint)

    this.endpoint = 'transactions'
  }

  All({ order }) {
    return this.request.send(`orders/${order}/${this.endpoint}`, 'GET')
  }

  Capture({ order, transaction }) {
    return this.request.send(
      `orders/${order}/transactions/${transaction}/capture`,
      'POST'
    )
  }

  Refund({ order, transaction }) {
    return this.request.send(
      `orders/${order}/transactions/${transaction}/refund`,
      'POST'
    )
  }
}

export default TransactionsEndpoint
